
export type CaseType = 'upper' | 'lower' | 'sentence' | 'title';

export const changeCase = (text: string, type: CaseType): string => {
    switch (type) {
        case 'upper':
            return text.toUpperCase();
        case 'lower':
            return text.toLowerCase();
        case 'sentence':
            return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        case 'title':
            return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
        default:
            return text;
    }
};

export const sortLines = (text: string, reverse: boolean): string => {
    const sorted = text.split('\n').sort();
    if (reverse) {
        return sorted.reverse().join('\n');
    }
    return sorted.join('\n');
};

export const reverseText = (text: string): string => {
    return text.split('').reverse().join('');
};

export const removeAccents = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const countWordOccurrence = (text: string, word: string): number => {
    if (!word) return 0;
    // Use a regular expression with 'gi' flags for a global, case-insensitive search
    const regex = new RegExp(word, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
};

export const textToHtml = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\n/g, '<br />');
};

export const manageNewlines = (text: string, action: 'remove' | 'space'): string => {
    if (action === 'remove') {
        return text.replace(/(\r\n|\n|\r)/gm, "");
    }
    return text.replace(/(\r\n|\n|\r)/gm, " ");
};

export const splitString = (text: string, delimiter: string): string => {
    return text.split(delimiter).join('\n');
};
