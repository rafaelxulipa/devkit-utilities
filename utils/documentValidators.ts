
const calculateCpfDigit = (digits: string): number => {
    const numbers = digits.split('').map(Number);
    let sum = numbers.reduce((acc, digit, index) => acc + digit * (numbers.length + 1 - index), 0);
    let remainder = 11 - (sum % 11);
    return remainder >= 10 ? 0 : remainder;
};

export const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    const firstNine = cleanCPF.substring(0, 9);
    const firstDigit = calculateCpfDigit(firstNine);
    
    if (firstDigit !== parseInt(cleanCPF[9], 10)) {
        return false;
    }

    const firstTen = cleanCPF.substring(0, 10);
    const secondDigit = calculateCpfDigit(firstTen);
    
    return secondDigit === parseInt(cleanCPF[10], 10);
};


const calculateCnpjDigit = (digits: string, weights: number[]): number => {
    const numbers = digits.split('').map(Number);
    let sum = numbers.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
};


export const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

    if (cleanCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanCNPJ)) {
        return false;
    }

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    const firstTwelve = cleanCNPJ.substring(0, 12);
    const firstDigit = calculateCnpjDigit(firstTwelve, weights1);

    if (firstDigit !== parseInt(cleanCNPJ[12], 10)) {
        return false;
    }

    const firstThirteen = cleanCNPJ.substring(0, 13);
    const secondDigit = calculateCnpjDigit(firstThirteen, weights2);
    
    return secondDigit === parseInt(cleanCNPJ[13], 10);
};
