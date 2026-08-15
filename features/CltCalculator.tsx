
import React, { useState } from 'react';
import Button from '../components/Button';
import { calcularRescisao, RescisaoResultado, TipoRescisao, TipoAvisoPrevio } from '../utils/cltCalculator';

const tiposRescisao: { id: TipoRescisao; label: string }[] = [
    { id: 'sem_justa_causa', label: 'Dispensa sem justa causa' },
    { id: 'pedido_demissao', label: 'Pedido de demissão' },
    { id: 'justa_causa', label: 'Dispensa por justa causa' },
    { id: 'acordo', label: 'Acordo entre as partes (Art. 484-A)' },
];

const formatCurrency = (value: number): string =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';
const labelClass = 'block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1';

const CltCalculator: React.FC = () => {
    const [salarioBruto, setSalarioBruto] = useState(2000);
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [dataDemissao, setDataDemissao] = useState('');
    const [tipoRescisao, setTipoRescisao] = useState<TipoRescisao>('sem_justa_causa');
    const [avisoPrevio, setAvisoPrevio] = useState<TipoAvisoPrevio>('indenizado');
    const [feriasVencidasPeriodos, setFeriasVencidasPeriodos] = useState(0);
    const [saldoFgts, setSaldoFgts] = useState(0);
    const [resultado, setResultado] = useState<RescisaoResultado | null>(null);
    const [erro, setErro] = useState('');

    const handleCalcular = () => {
        setErro('');
        setResultado(null);

        if (!dataAdmissao || !dataDemissao) {
            setErro('Informe as datas de admissão e demissão.');
            return;
        }
        if (dataDemissao < dataAdmissao) {
            setErro('A data de demissão não pode ser anterior à data de admissão.');
            return;
        }
        if (!salarioBruto || salarioBruto <= 0) {
            setErro('Informe um salário bruto válido.');
            return;
        }

        setResultado(calcularRescisao({
            salarioBruto,
            dataAdmissao,
            dataDemissao,
            tipoRescisao,
            avisoPrevio,
            feriasVencidasPeriodos,
            saldoFgts,
        }));
    };

    const ResultLine = ({ label, value, detail }: { label: string; value: number; detail?: string }) => (
        <div className="flex justify-between items-baseline py-2 border-b border-light-secondary/10 dark:border-dark-secondary/10 last:border-0">
            <span className="text-sm">
                {label}
                {detail && <span className="text-light-secondary dark:text-dark-secondary"> ({detail})</span>}
            </span>
            <span className="font-mono font-medium">{formatCurrency(value)}</span>
        </div>
    );

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass} htmlFor="salario">Salário Bruto Mensal (R$)</label>
                        <input id="salario" type="number" min="0" step="0.01" value={salarioBruto}
                            onChange={e => setSalarioBruto(Number(e.target.value))} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="tipo-rescisao">Tipo de Rescisão</label>
                        <select id="tipo-rescisao" value={tipoRescisao}
                            onChange={e => setTipoRescisao(e.target.value as TipoRescisao)} className={inputClass}>
                            {tiposRescisao.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="data-admissao">Data de Admissão</label>
                        <input id="data-admissao" type="date" value={dataAdmissao}
                            onChange={e => setDataAdmissao(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="data-demissao">Data de Demissão</label>
                        <input id="data-demissao" type="date" value={dataDemissao}
                            onChange={e => setDataDemissao(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="aviso-previo">Aviso Prévio</label>
                        <select id="aviso-previo" value={avisoPrevio}
                            onChange={e => setAvisoPrevio(e.target.value as TipoAvisoPrevio)} className={inputClass}>
                            <option value="indenizado">Indenizado</option>
                            <option value="trabalhado">Trabalhado</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="ferias-vencidas">Períodos de Férias Vencidas (não gozadas)</label>
                        <input id="ferias-vencidas" type="number" min="0" step="1" value={feriasVencidasPeriodos}
                            onChange={e => setFeriasVencidasPeriodos(Number(e.target.value))} className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="saldo-fgts">Saldo do FGTS Depositado (R$, opcional — para estimar a multa)</label>
                        <input id="saldo-fgts" type="number" min="0" step="0.01" value={saldoFgts}
                            onChange={e => setSaldoFgts(Number(e.target.value))} className={inputClass} />
                    </div>
                </div>

                <div className="text-center pt-2">
                    <Button onClick={handleCalcular}>Calcular</Button>
                </div>
            </div>

            {erro && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{erro}</p>}

            {resultado && (
                <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg">
                    <ResultLine label="Saldo de Salário" value={resultado.saldoSalario} />
                    {resultado.avisoPrevioValor > 0 &&
                        <ResultLine label="Aviso Prévio Indenizado" value={resultado.avisoPrevioValor} detail={`${resultado.avisoPrevioDias} dias`} />}
                    {resultado.decimoTerceiroValor > 0 &&
                        <ResultLine label="13º Salário Proporcional" value={resultado.decimoTerceiroValor} detail={`${resultado.decimoTerceiroAvos}/12`} />}
                    {resultado.feriasProporcionaisValor > 0 && <>
                        <ResultLine label="Férias Proporcionais" value={resultado.feriasProporcionaisValor} detail={`${resultado.feriasProporcionaisAvos}/12`} />
                        <ResultLine label="1/3 Constitucional (proporcionais)" value={resultado.tercoFeriasProporcionais} />
                    </>}
                    {resultado.feriasVencidasValor > 0 && <>
                        <ResultLine label="Férias Vencidas" value={resultado.feriasVencidasValor} />
                        <ResultLine label="1/3 Constitucional (vencidas)" value={resultado.tercoFeriasVencidas} />
                    </>}
                    {resultado.multaFgts > 0 &&
                        <ResultLine label="Multa do FGTS" value={resultado.multaFgts} detail={tipoRescisao === 'acordo' ? '20%' : '40%'} />}

                    <div className="flex justify-between items-baseline pt-4 mt-2 border-t-2 border-light-primary/30 dark:border-dark-primary/30">
                        <span className="font-bold">Total Estimado</span>
                        <span className="text-xl font-bold text-light-primary dark:text-dark-primary font-mono">
                            {formatCurrency(resultado.total)}
                        </span>
                    </div>
                </div>
            )}

            <p className="text-xs text-center text-light-secondary dark:text-dark-secondary">
                Cálculo estimado e simplificado, apenas para referência — não inclui descontos de
                INSS/IRRF, faltas, adiantamentos ou convenções coletivas específicas, e não substitui
                a conferência do RH ou de um contador.
            </p>
        </div>
    );
};

export default CltCalculator;
