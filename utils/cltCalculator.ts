// --- Calculadora de Rescisão CLT (estimativa) ---
// Cálculo simplificado das principais verbas rescisórias da CLT. Não substitui o RH/contador:
// não considera descontos de INSS/IRRF, faltas, adiantamentos, vale-transporte, acordos coletivos
// específicos da categoria, nem a projeção do aviso prévio indenizado sobre o tempo de serviço
// (o que pode fazer o valor real de 13º/férias ser um pouco maior em alguns casos).

export type TipoRescisao = 'sem_justa_causa' | 'pedido_demissao' | 'justa_causa' | 'acordo';
export type TipoAvisoPrevio = 'indenizado' | 'trabalhado';

export interface RescisaoInput {
    salarioBruto: number;
    dataAdmissao: string; // YYYY-MM-DD
    dataDemissao: string; // YYYY-MM-DD
    tipoRescisao: TipoRescisao;
    avisoPrevio: TipoAvisoPrevio;
    feriasVencidasPeriodos: number;
    saldoFgts: number;
}

export interface RescisaoResultado {
    saldoSalario: number;
    avisoPrevioDias: number;
    avisoPrevioValor: number;
    decimoTerceiroAvos: number;
    decimoTerceiroValor: number;
    feriasProporcionaisAvos: number;
    feriasProporcionaisValor: number;
    tercoFeriasProporcionais: number;
    feriasVencidasValor: number;
    tercoFeriasVencidas: number;
    multaFgts: number;
    total: number;
}

const parseDateAsUTC = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};

const addYearsUTC = (date: Date, years: number): Date =>
    new Date(Date.UTC(date.getUTCFullYear() + years, date.getUTCMonth(), date.getUTCDate()));

// Conta quantos "avos" (meses, de 0 a 12) foram trabalhados entre `start` e `end`, considerando
// que cada mês do calendário conta como um avo se houver 15 dias ou mais de trabalho nele
// (regra da CLT para 13º e férias proporcionais).
const countCalendarMonthAvos = (start: Date, end: Date): number => {
    if (start > end) return 0;
    let avos = 0;
    let year = start.getUTCFullYear();
    let month = start.getUTCMonth();
    const endYear = end.getUTCFullYear();
    const endMonth = end.getUTCMonth();

    while (year < endYear || (year === endYear && month <= endMonth)) {
        const monthStart = new Date(Date.UTC(year, month, 1));
        const monthEnd = new Date(Date.UTC(year, month + 1, 0));
        const workStart = start > monthStart ? start : monthStart;
        const workEnd = end < monthEnd ? end : monthEnd;
        const daysWorked = Math.floor((workEnd.getTime() - workStart.getTime()) / 86400000) + 1;
        if (daysWorked >= 15) avos++;
        month++;
        if (month > 11) { month = 0; year++; }
    }
    return Math.min(avos, 12);
};

const anosCompletos = (admissao: Date, demissao: Date): number => {
    let anos = 0;
    let cursor = admissao;
    while (addYearsUTC(cursor, 1) <= demissao) {
        anos++;
        cursor = addYearsUTC(cursor, 1);
    }
    return anos;
};

// Início do período aquisitivo de férias em curso: o aniversário de admissão mais recente
// que seja anterior ou igual à data de demissão.
const getCurrentFeriasPeriodStart = (admissao: Date, demissao: Date): Date => {
    let periodStart = admissao;
    let next = addYearsUTC(periodStart, 1);
    while (next <= demissao) {
        periodStart = next;
        next = addYearsUTC(periodStart, 1);
    }
    return periodStart;
};

export const calcularRescisao = (input: RescisaoInput): RescisaoResultado => {
    const admissao = parseDateAsUTC(input.dataAdmissao);
    const demissao = parseDateAsUTC(input.dataDemissao);
    const salario = input.salarioBruto;
    const salarioDiario = salario / 30;

    const perdeVerbasProporcionais = input.tipoRescisao === 'justa_causa';
    const temDireitoAviso = input.tipoRescisao === 'sem_justa_causa' || input.tipoRescisao === 'acordo';

    // Saldo de salário: dias trabalhados no mês da rescisão.
    const saldoSalario = salarioDiario * demissao.getUTCDate();

    // Aviso prévio proporcional (Lei 12.506/2011): 30 dias + 3 dias por ano completo, até 90 dias.
    const anos = anosCompletos(admissao, demissao);
    const avisoPrevioDias = Math.min(30 + 3 * anos, 90);
    let avisoPrevioValor = 0;
    if (temDireitoAviso && input.avisoPrevio === 'indenizado') {
        avisoPrevioValor = salarioDiario * avisoPrevioDias;
        if (input.tipoRescisao === 'acordo') avisoPrevioValor /= 2; // Art. 484-A: aviso pela metade
    }

    // 13º salário proporcional (avos do ano-calendário da demissão).
    let decimoTerceiroAvos = 0;
    let decimoTerceiroValor = 0;
    if (!perdeVerbasProporcionais) {
        const inicioAnoCalendario = new Date(Date.UTC(demissao.getUTCFullYear(), 0, 1));
        const periodStart13 = admissao > inicioAnoCalendario ? admissao : inicioAnoCalendario;
        decimoTerceiroAvos = countCalendarMonthAvos(periodStart13, demissao);
        decimoTerceiroValor = (salario / 12) * decimoTerceiroAvos;
    }

    // Férias proporcionais + 1/3 constitucional (avos do período aquisitivo em curso).
    let feriasProporcionaisAvos = 0;
    let feriasProporcionaisValor = 0;
    let tercoFeriasProporcionais = 0;
    if (!perdeVerbasProporcionais) {
        const periodStartFerias = getCurrentFeriasPeriodStart(admissao, demissao);
        feriasProporcionaisAvos = countCalendarMonthAvos(periodStartFerias, demissao);
        feriasProporcionaisValor = (salario / 12) * feriasProporcionaisAvos;
        tercoFeriasProporcionais = feriasProporcionaisValor / 3;
    }

    // Férias vencidas (períodos completos não gozados) + 1/3 — direito adquirido, devido mesmo
    // em caso de justa causa.
    const feriasVencidasValor = salario * Math.max(0, input.feriasVencidasPeriodos);
    const tercoFeriasVencidas = feriasVencidasValor / 3;

    // Multa do FGTS sobre o saldo informado: 40% (sem justa causa) ou 20% (acordo art. 484-A).
    let multaFgts = 0;
    if (input.saldoFgts > 0) {
        if (input.tipoRescisao === 'sem_justa_causa') multaFgts = input.saldoFgts * 0.4;
        else if (input.tipoRescisao === 'acordo') multaFgts = input.saldoFgts * 0.2;
    }

    const total = saldoSalario + avisoPrevioValor + decimoTerceiroValor + feriasProporcionaisValor +
        tercoFeriasProporcionais + feriasVencidasValor + tercoFeriasVencidas + multaFgts;

    return {
        saldoSalario,
        avisoPrevioDias,
        avisoPrevioValor,
        decimoTerceiroAvos,
        decimoTerceiroValor,
        feriasProporcionaisAvos,
        feriasProporcionaisValor,
        tercoFeriasProporcionais,
        feriasVencidasValor,
        tercoFeriasVencidas,
        multaFgts,
        total,
    };
};
