
const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const teens = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

const thousands = [
    { single: 'mil', plural: 'mil' },
    { single: 'milhão', plural: 'milhões' },
    { single: 'bilhão', plural: 'bilhões' },
    { single: 'trilhão', plural: 'trilhões' },
    { single: 'quatrilhão', plural: 'quatrilhões' },
];

function convertThreeDigits(n: number): string {
    if (n === 0) return '';
    if (n > 999) return 'Número muito grande para esta parte';

    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const u = n % 10;

    let result = [];

    if (h > 0) {
        if (h === 1 && (t > 0 || u > 0)) {
            result.push('cento');
        } else if (h === 1 && t === 0 && u === 0) {
            result.push('cem');
        } else {
            result.push(hundreds[h]);
        }
    }

    if (t > 0 || u > 0) {
        if (t === 1) {
            result.push(teens[u]);
        } else {
            if (t > 1) {
                result.push(tens[t]);
            }
            if (u > 0) {
                result.push(units[u]);
            }
        }
    }

    return result.join(' e ');
}

export function numberToWords(number: number | string): string {
    const num = typeof number === 'string' ? parseInt(number, 10) : number;

    if (isNaN(num)) return 'Número inválido';
    if (num === 0) return 'zero';

    if (num < 0) {
        return `menos ${numberToWords(Math.abs(num))}`;
    }

    const numStr = num.toString().padStart(Math.ceil(num.toString().length / 3) * 3, '0');
    const chunks = numStr.match(/.{1,3}/g)!.map(Number);
    
    if (chunks.length > thousands.length + 1) {
        return 'Número muito grande';
    }

    let parts: string[] = [];
    chunks.forEach((chunk, i) => {
        if (chunk === 0) return;

        const textPart = convertThreeDigits(chunk);
        const scaleIndex = chunks.length - i - 2;
        
        if (scaleIndex >= 0) {
            const scale = thousands[scaleIndex];
            const scaleText = chunk === 1 ? scale.single : scale.plural;
            // "um mil" é apenas "mil"
            if (scaleIndex === 0 && chunk === 1) {
                 parts.push(scaleText);
            } else {
                parts.push(`${textPart} ${scaleText}`);
            }
        } else {
            parts.push(textPart);
        }
    });

    return parts.join(', ').replace(/, (?=e )/g, ' ');
}
