
// Helper to get today's date in YYYY-MM-DD format
export const getTodayString = (): string => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split('T')[0];
};

// Helper to parse date string as UTC to avoid timezone issues
const parseDateAsUTC = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};


export const calculateDaysBetween = (startDate: string, endDate: string): string => {
    if (!startDate || !endDate) return "Por favor, selecione as duas datas.";
    
    const start = parseDateAsUTC(startDate);
    const end = parseDateAsUTC(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Data inválida."
    }

    const differenceInMillis = end.getTime() - start.getTime();
    const differenceInDays = Math.round(differenceInMillis / (1000 * 60 * 60 * 24));
    
    const dayWord = Math.abs(differenceInDays) === 1 ? 'dia' : 'dias';
    return `A diferença é de ${Math.abs(differenceInDays)} ${dayWord}.`;
};

export const addDaysToDate = (date: string, days: number): string => {
    if (!date || isNaN(days)) return "Por favor, selecione a data e o número de dias.";

    const startDate = parseDateAsUTC(date);
    startDate.setUTCDate(startDate.getUTCDate() + days);
    
    const newDate = startDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return `A nova data será: ${newDate}`;
};

export const subtractDaysFromDate = (date: string, days: number): string => {
    if (!date || isNaN(days)) return "Por favor, selecione a data e o número de dias.";

    const startDate = parseDateAsUTC(date);
    startDate.setUTCDate(startDate.getUTCDate() - days);
    
    const newDate = startDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return `A nova data será: ${newDate}`;
};
