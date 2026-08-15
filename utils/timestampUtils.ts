export type TimestampUnit = 'seconds' | 'milliseconds';

export interface TimezoneOption {
    id: string;
    label: string;
}

// Fusos comuns para exibição rápida (a lista completa de IANA timezones fica a cargo do navegador).
export const commonTimezones: TimezoneOption[] = [
    { id: 'America/Sao_Paulo', label: 'São Paulo (BRT)' },
    { id: 'America/Manaus', label: 'Manaus (AMT)' },
    { id: 'America/Noronha', label: 'Fernando de Noronha (FNT)' },
    { id: 'UTC', label: 'UTC' },
    { id: 'America/New_York', label: 'Nova York (EST/EDT)' },
    { id: 'Europe/Lisbon', label: 'Lisboa (WET/WEST)' },
    { id: 'Europe/London', label: 'Londres (GMT/BST)' },
    { id: 'Asia/Tokyo', label: 'Tóquio (JST)' },
];

export const timestampToDate = (value: number, unit: TimestampUnit): Date =>
    new Date(unit === 'seconds' ? value * 1000 : value);

export const dateToUnixSeconds = (date: Date): number => Math.floor(date.getTime() / 1000);
export const dateToUnixMilliseconds = (date: Date): number => date.getTime();

export const formatInTimeZone = (date: Date, timeZone: string): string =>
    date.toLocaleString('pt-BR', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
