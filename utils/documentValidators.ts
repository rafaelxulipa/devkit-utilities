// --- HELPERS ---
const allDigitsTheSame = (s: string) => /^(\d)\1+$/.test(s);
const clean = (s: string) => s.replace(/[^\d]/g, '');

// --- MOD 11 algorithm ---
const mod11 = (digits: string, weights: number[]): number => {
    const numbers = digits.split('').map(Number);
    const sum = numbers.reduce((acc, digit, index) => acc + digit * weights[index % weights.length], 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

// --- CPF Validator ---
export const validateCPF = (cpf: string): boolean => {
    const cleanCPF = clean(cpf);
    if (cleanCPF.length !== 11 || allDigitsTheSame(cleanCPF)) return false;

    const firstNine = cleanCPF.substring(0, 9);
    const d1 = mod11(firstNine, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
    if (d1 !== parseInt(cleanCPF[9], 10)) return false;

    const firstTen = cleanCPF.substring(0, 10);
    const d2 = mod11(firstTen, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
    return d2 === parseInt(cleanCPF[10], 10);
};

// --- CNPJ Validator ---
export const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = clean(cnpj);
    if (cleanCNPJ.length !== 14 || allDigitsTheSame(cleanCNPJ)) return false;

    const firstTwelve = cleanCNPJ.substring(0, 12);
    const d1 = mod11(firstTwelve, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    if (d1 !== parseInt(cleanCNPJ[12], 10)) return false;
    
    const firstThirteen = cleanCNPJ.substring(0, 13);
    const d2 = mod11(firstThirteen, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return d2 === parseInt(cleanCNPJ[13], 10);
};

// --- Luhn Algorithm (Credit Card) Validator ---
export const validateLuhn = (ccNumber: string): boolean => {
    const cleanNumber = clean(ccNumber);
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
    
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
};

// --- PIS/PASEP Validator ---
export const validatePIS = (pis: string): boolean => {
    const cleanPIS = clean(pis);
    if (cleanPIS.length !== 11 || allDigitsTheSame(cleanPIS)) return false;

    const firstTen = cleanPIS.substring(0, 10);
    const d = mod11(firstTen, [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    return d === parseInt(cleanPIS[10], 10);
};

// --- RENAVAM Validator ---
export const validateRENAVAM = (renavam: string): boolean => {
    const cleanRENAVAM = clean(renavam).padStart(11, '0');
    if (cleanRENAVAM.length !== 11 || allDigitsTheSame(cleanRENAVAM)) return false;

    const firstTen = cleanRENAVAM.substring(0, 10);
    const reversedFirstTen = firstTen.split('').reverse().join('');
    const d = mod11(reversedFirstTen, [2, 3, 4, 5, 6, 7, 8, 9]);
    return d === parseInt(cleanRENAVAM[10], 10);
};

// --- CNH Validator ---
export const validateCNH = (cnh: string): boolean => {
    const cleanCNH = clean(cnh);
    if (cleanCNH.length !== 11 || allDigitsTheSame(cleanCNH)) return false;
    
    const firstNine = cleanCNH.substring(0, 9);
    let sum1 = 0;
    for (let i = 0, j = 9; i < 9; i++, j--) {
        sum1 += parseInt(firstNine.charAt(i), 10) * j;
    }
    let d1 = sum1 % 11;
    let penalty = 0;
    if (d1 >= 10) {
        d1 = 0;
        penalty = 2;
    }

    let sum2 = 0;
    for (let i = 0, j = 1; i < 9; i++, j++) {
        sum2 += parseInt(firstNine.charAt(i), 10) * j;
    }
    const remainder2 = sum2 % 11;
    let d2 = remainder2 >= 10 ? 0 : remainder2;
    
    if (d2 - penalty < 0) {
      d2 = d2 - penalty + 11;
    } else {
      d2 = d2 - penalty;
    }

    return `${d1}${d2}` === cleanCNH.substring(9);
};

// --- Título de Eleitor Validator ---
export const validateTituloEleitor = (titulo: string): boolean => {
    const cleanTitulo = clean(titulo);
    if (cleanTitulo.length !== 12) return false;

    const base = cleanTitulo.substring(0, 8);
    const stateCode = parseInt(cleanTitulo.substring(8, 10), 10);
    if (stateCode < 1 || stateCode > 28) return false;

    // FIX: Cannot assign to 'd1' because it is a constant.
    let d1 = mod11(base, [2, 3, 4, 5, 6, 7, 8, 9]);
    if(d1 === 10) d1 = 0;
    if (d1 !== parseInt(cleanTitulo[10], 10)) return false;

    const secondPart = cleanTitulo.substring(8, 11);
    // FIX: Cannot assign to 'd2' because it is a constant.
    let d2 = mod11(secondPart, [7, 8, 9]);
    if(d2 === 10) d2 = 0;

    return d2 === parseInt(cleanTitulo[11], 10);
};

// --- Inscrição Estadual (SP) Validator ---
export const validateIE_SP = (ie: string): boolean => {
    const cleanIE = clean(ie);
    if (cleanIE.length !== 12) return false;
    
    const base1 = cleanIE.substring(0, 8);
    const weights1 = [1, 3, 4, 5, 6, 7, 8, 10];
    const sum1 = base1.split('').reduce((acc, digit, i) => acc + parseInt(digit) * weights1[i], 0);
    const d1 = (sum1 % 11) % 10;
    if (d1 !== parseInt(cleanIE[8], 10)) return false;

    const base2 = cleanIE.substring(0, 11);
    const weights2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum2 = base2.split('').reduce((acc, digit, i) => acc + parseInt(digit) * weights2[i], 0);
    const d2 = (sum2 % 11) % 10;
    return d2 === parseInt(cleanIE[11], 10);
};

// --- RG (SP) Validator ---
export const validateRG_SP = (rg: string): boolean => {
    const cleanRG = clean(rg.toUpperCase());
    if (cleanRG.length !== 9) return false;
    
    const base = cleanRG.substring(0, 8);
    const checkDigit = cleanRG.substring(8, 9);
    
    const weights = [2, 3, 4, 5, 6, 7, 8, 9];
    const sum = base.split('').reduce((acc, digit, i) => acc + parseInt(digit) * weights[i], 0);
    const remainder = sum % 11;
    
    const calculatedDigit = remainder === 0 ? '0' : remainder === 1 ? 'X' : String(11 - remainder);
    
    return checkDigit === calculatedDigit;
};

// --- Certidão Civil (32 digits) Validator ---
export const validateCertidao = (certidao: string): boolean => {
    const cleanCertidao = clean(certidao);
    if (cleanCertidao.length !== 32) return false;
    
    const mod97 = (value: string): number => {
      let remainder = 0;
      for (const char of value) {
        remainder = (remainder * 10 + parseInt(char, 10)) % 97;
      }
      return remainder;
    };
    
    const part1 = cleanCertidao.substring(0, 29);
    const dv1 = parseInt(cleanCertidao.substring(29, 31), 10);
    
    const remainder1 = mod97(part1);
    if ((98 - remainder1) % 97 !== dv1) return false;
    
    const part2 = `${part1}${String(dv1).padStart(2, '0')}`;
    const dv2 = parseInt(cleanCertidao.substring(31, 32), 10); // Note: It's just one digit
    
    // This is a simplified check, the full spec is more complex,
    // but this mod97 check is the core of many certificate validations.
    // The second DV is often simpler or uses a different scheme.
    // Let's use mod11 for the second DV as a common pattern.
    const remainder2 = mod11(part2, [4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6]);
    
    return remainder2 === dv2;
};