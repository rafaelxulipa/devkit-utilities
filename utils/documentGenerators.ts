
// --- HELPERS ---
const random = (max: number = 9) => Math.floor(Math.random() * (max + 1));
const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const applyMask = (value: string, mask: string): string => {
    let result = '';
    let i = 0;
    let j = 0;
    while (i < mask.length && j < value.length) {
        if (mask[i] === '#') {
            result += value[j];
            j++;
        } else {
            result += mask[i];
        }
        i++;
    }
    return result;
};

const mod11 = (digits: number[] | string, weights: number[]): number => {
    const numbers = Array.isArray(digits) ? digits : [...digits].map(Number);
    const sum = numbers.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}


// --- CPF ---
const calculateCpfDigit = (digits: number[]): number => {
    let sum = digits.reduce((acc, digit, index) => acc + digit * (digits.length + 1 - index), 0);
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCPF = (masked: boolean = true): string => {
    const baseDigits: number[] = Array.from({ length: 9 }, () => random());
    const firstDigit = calculateCpfDigit(baseDigits);
    const secondDigit = calculateCpfDigit([...baseDigits, firstDigit]);
    const cpf = [...baseDigits, firstDigit, secondDigit].join('');
    return masked ? applyMask(cpf, '###.###.###-##') : cpf;
};


// --- CNPJ ---
const calculateCnpjDigit = (digits: number[]): number => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const relevantWeights = weights.slice(weights.length - digits.length);
    let sum = digits.reduce((acc, digit, index) => acc + digit * relevantWeights[index], 0);
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCNPJ = (masked: boolean = true): string => {
    const baseDigits: number[] = [...Array.from({ length: 8 }, () => random()), 0, 0, 0, 1];
    const firstDigit = calculateCnpjDigit(baseDigits);
    const secondDigit = calculateCnpjDigit([...baseDigits, firstDigit]);
    const cnpj = [...baseDigits, firstDigit, secondDigit].join('');
    return masked ? applyMask(cnpj, '##.###.###/####-##') : cnpj;
};

// --- RG (São Paulo) ---
export const generateRG = (masked: boolean = true): string => {
    const base = Array.from({ length: 8 }, () => random());
    const weights = [2, 3, 4, 5, 6, 7, 8, 9];
    const sum = base.reduce((acc, digit, i) => acc + digit * weights[i], 0);
    const remainder = sum % 11;
    const digit = remainder === 0 ? 0 : remainder === 1 ? 'X' : 11 - remainder;
    const rg = `${base.join('')}${digit}`;
    return masked ? applyMask(rg, '##.###.###-#') : rg;
}

// --- Título de Eleitor ---
export const generateTituloEleitor = (masked: boolean = true): string => {
    const base = Array.from({ length: 8 }, () => random());
    // Gerar código do estado (UF) - 01 a 28
    const uf = [random(2), random()].join('');
    const stateCode = (parseInt(uf, 10) % 28 + 1).toString().padStart(2, '0');
    const fullBase = [...base, ...stateCode.split('').map(Number)];

    const d1 = mod11(fullBase.slice(0, 8), [2, 3, 4, 5, 6, 7, 8, 9]);
    const d2 = mod11([...fullBase.slice(8, 10), d1], [7, 8, 9]);
    
    const titulo = `${base.join('')}${stateCode}${d1}${d2}`;
    return masked ? applyMask(titulo, '#### #### ####') : titulo;
}

// --- CNH ---
export const generateCNH = (masked: boolean = true): string => {
    const base = Array.from({ length: 9 }, () => random());
    
    let sum1 = 0;
    let multiplier = 9;
    for(let i = 0; i < 9; i++) {
        sum1 += base[i] * multiplier;
        multiplier--;
    }
    let d1 = sum1 % 11;
    let penalty = 0;
    if (d1 >= 10) {
        d1 = 0;
        penalty = 2;
    }

    let sum2 = 0;
    multiplier = 1;
    for(let i = 0; i < 9; i++) {
        sum2 += base[i] * multiplier;
        multiplier++;
    }
    let d2 = sum2 % 11;
    if (d2 >= 10) {
        d2 = 0;
    }
    if (d2 - penalty < 0) {
        d2 = d2 - penalty + 11;
    } else {
        d2 = d2 - penalty;
    }

    const cnh = `${base.join('')}${d1}${d2}`;
    return masked ? cnh : cnh; // CNH doesn't have a standard mask
}


// --- PIS/PASEP ---
export const generatePIS = (masked: boolean = true): string => {
    const base = Array.from({ length: 10 }, () => random());
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d1 = mod11(base, weights);
    const pis = `${base.join('')}${d1}`;
    return masked ? applyMask(pis, '###.#####.##-#') : pis;
}


// --- RENAVAM ---
export const generateRENAVAM = (): string => {
    const base = Array.from({ length: 10 }, () => random());
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3];
    const sum = base.reduce((acc, digit, i) => acc + digit * weights[i], 0);
    const remainder = sum % 11;
    const digit = remainder < 2 ? 0 : 11 - remainder;
    return `${base.join('')}${digit}`.padStart(11, '0');
};

// --- Placa de Veículo (Mercosul) ---
export const generatePlaca = (): string => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // FIX: The `randomFrom` function expects an array, but `letras` was a string. Converted it to an array.
    const L = () => randomFrom(letras.split(''));
    const N = () => random(9);
    return `${L()}${L()}${L()}${N()}${L()}${N()}${N()}`;
};

// --- Inscrição Estadual (São Paulo) ---
export const generateIE = (masked: boolean = true): string => {
    const base = Array.from({ length: 8 }, () => random());
    const weights1 = [1, 3, 4, 5, 6, 7, 8, 10];
    const sum1 = base.reduce((acc, digit, i) => acc + digit * weights1[i], 0);
    const d1 = sum1 % 11 % 10;

    const fullBase = [...base.slice(0,8), d1, ...Array.from({ length: 2 }, () => random())];
    const weights2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum2 = fullBase.reduce((acc, digit, i) => acc + digit * weights2[i], 0);
    const d2 = sum2 % 11 % 10;
    
    const ie = `110${base.join('').substring(0,8)}${d1}${random(9)}${d2}`;
    return masked ? applyMask(ie, '###.###.###.###') : ie;
};

// --- Cartão de Crédito ---
export const generateCreditCard = (): string => {
    const base = Array.from({ length: 15 }, () => random());
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
        let digit = base[i];
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    const checksum = (Math.ceil(sum / 10) * 10 - sum) % 10;
    return `${base.join('')}${checksum}`;
};

// --- Conta Bancária ---
export const generateBankAccount = () => {
    const banco = ['001', '237', '341', '104', '033'][random(4)];
    const agencia = Array.from({ length: 4 }, () => random()).join('');
    const conta = Array.from({ length: 8 }, () => random()).join('');
    const digito = random();
    return `${banco} / ${agencia} / ${conta}-${digito}`;
};


// --- Dados de Pessoas e Empresas ---
const firstNames = ["Miguel", "Arthur", "Gael", "Heitor", "Theo", "Davi", "Gabriel", "Bernardo", "Samuel", "Helena", "Alice", "Laura", "Maria", "Valentina", "Heloísa", "Maria", "Cecília", "Maitê", "Liz"];
const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida"];
const companySuffixes = ["Ltda", "S.A.", "e Associados", "Soluções Digitais", "Group", "Consultoria"];

export const generatePerson = (masked: boolean) => ({
    nome: `${randomFrom(firstNames)} ${randomFrom(lastNames)}`,
    cpf: generateCPF(masked),
    rg: generateRG(masked),
});

export const generateCompany = (masked: boolean) => ({
    nome: `${randomFrom(lastNames)} ${randomFrom(companySuffixes)}`,
    cnpj: generateCNPJ(masked),
    ie: generateIE(masked),
});

export const generateVehicle = () => ({
    placa: generatePlaca(),
    renavam: generateRENAVAM()
});