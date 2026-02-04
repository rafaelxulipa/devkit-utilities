
// Helper to generate random numbers
const random = (max: number = 9) => Math.floor(Math.random() * (max + 1));

// Helper to apply CPF/CNPJ mask
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

// CPF Generation
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


// CNPJ Generation
const calculateCnpjDigit = (digits: number[]): number => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const relevantWeights = weights.slice(weights.length - digits.length);
    
    let sum = digits.reduce((acc, digit, index) => acc + digit * relevantWeights[index], 0);
    let remainder = sum % 11;
    
    return remainder < 2 ? 0 : 11 - remainder;
};

export const generateCNPJ = (masked: boolean = true): string => {
    const baseDigits: number[] = [
        ...Array.from({ length: 8 }, () => random()), 
        0, 0, 0, 1 // Standard branch number
    ];
    
    const firstDigit = calculateCnpjDigit(baseDigits);
    const secondDigit = calculateCnpjDigit([...baseDigits, firstDigit]);

    const cnpj = [...baseDigits, firstDigit, secondDigit].join('');
    
    return masked ? applyMask(cnpj, '##.###.###/####-##') : cnpj;
};
