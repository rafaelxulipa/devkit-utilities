export type NickMethod = 'aleatorio' | 'nome' | 'nome_adjetivo';

export interface NickOptions {
    method: NickMethod;
    nome: string;
    sobrenome: string;
    tamanho: number; // 4 a 8
    quantidade: number;
}

const consonants = 'bcdfgjklmnprstvxz'.split('');
const vowels = 'aeiou'.split('');
const adjectives = ['Rapido', 'Brilhante', 'Sombrio', 'Misterioso', 'Silencioso', 'Epico', 'Dourado', 'Gelido', 'Letal', 'Oculto', 'Fera', 'Zen', 'Pro', 'Noturno'];
const fillers = ['x', 'z', '_', '.', '7', '9', '21', '99'];

const random = (max: number) => Math.floor(Math.random() * max);
const randomFrom = <T,>(arr: T[]): T => arr[random(arr.length)];

const onlyLetters = (value: string): string =>
    value
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-zA-Z]/g, '');

const fitToLength = (value: string, tamanho: number): string => {
    if (value.length > tamanho) {
        return value.slice(0, tamanho);
    }
    let result = value;
    while (result.length < tamanho) {
        result += randomFrom(fillers);
    }
    return result.slice(0, tamanho);
};

const randomPronounceable = (tamanho: number): string => {
    let result = '';
    let useConsonant = Math.random() > 0.5;
    while (result.length < tamanho) {
        result += useConsonant ? randomFrom(consonants) : randomFrom(vowels);
        useConsonant = !useConsonant;
    }
    return result.slice(0, tamanho);
};

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const buildFromName = (nome: string, sobrenome: string, tamanho: number): string => {
    const first = onlyLetters(nome);
    const last = onlyLetters(sobrenome);
    if (!first) return fitToLength(randomPronounceable(tamanho), tamanho);

    const variants = [
        `${first}${last}`,
        `${first}${randomFrom(fillers)}${last}`,
        `${first.slice(0, Math.ceil(first.length / 2))}${last}`,
        `${last}${first}`,
        `${first}${random(100)}`,
        [...first].reverse().join('') + last,
    ];
    return fitToLength(capitalize(randomFrom(variants)), tamanho);
};

const buildFromNameAndAdjective = (nome: string, tamanho: number): string => {
    const first = onlyLetters(nome) || randomPronounceable(4);
    const adjective = randomFrom(adjectives);
    const combined = Math.random() > 0.5 ? `${adjective}${first}` : `${first}${adjective}`;
    return fitToLength(combined, tamanho);
};

export const generateNicks = ({ method, nome, sobrenome, tamanho, quantidade }: NickOptions): string[] => {
    const clampedTamanho = Math.min(8, Math.max(4, tamanho));
    const clampedQuantidade = Math.min(20, Math.max(1, quantidade));
    const nicks = new Set<string>();

    let attempts = 0;
    while (nicks.size < clampedQuantidade && attempts < clampedQuantidade * 10) {
        attempts++;
        let nick: string;
        switch (method) {
            case 'nome':
                nick = buildFromName(nome, sobrenome, clampedTamanho);
                break;
            case 'nome_adjetivo':
                nick = buildFromNameAndAdjective(nome, clampedTamanho);
                break;
            default:
                nick = capitalize(randomPronounceable(clampedTamanho));
        }
        nicks.add(nick);
    }

    return Array.from(nicks);
};
