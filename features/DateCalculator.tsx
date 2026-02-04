
import React, { useState, useMemo } from 'react';
import Button from '../components/Button';
import * as DateUtils from '../utils/dateUtils';

type ToolId = 'between' | 'add' | 'subtract';

const tools: { id: ToolId; name: string }[] = [
    { id: 'between', name: 'Contador de Dias Entre Datas' },
    { id: 'add', name: 'Somar Dias a uma Data' },
    { id: 'subtract', name: 'Subtrair Dias de uma Data' },
];

const today = DateUtils.getTodayString();
const tomorrowDate = parseDateAsUTC(today);
tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);
const tomorrowString = tomorrowDate.toISOString().split('T')[0];

// Helper to parse date string as UTC to avoid timezone issues
function parseDateAsUTC(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};

const DateCalculator: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ToolId>('between');
    
    // States for tools
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrowString);
    const [days, setDays] = useState(30);
    
    const [result, setResult] = useState('');

    const handleCalculate = () => {
        let res = '';
        switch (activeTool) {
            case 'between':
                res = DateUtils.calculateDaysBetween(startDate, endDate);
                break;
            case 'add':
                res = DateUtils.addDaysToDate(startDate, days);
                break;
            case 'subtract':
                res = DateUtils.subtractDaysFromDate(startDate, days);
                break;
        }
        setResult(res);
    };
    
    const renderInputs = () => {
        switch (activeTool) {
            case 'between':
                return (
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="start-date" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">Data Inicial</label>
                            <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"/>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="end-date" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">Data Final</label>
                            <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"/>
                        </div>
                    </div>
                );
            case 'add':
            case 'subtract':
                return (
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="start-date-2" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">Data Base</label>
                            <input type="date" id="start-date-2" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"/>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="days" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">Número de Dias</label>
                            <input type="number" id="days" value={days} onChange={e => setDays(Number(e.target.value))} min="0" className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"/>
                        </div>
                    </div>
                );
        }
    };
    
    return (
        <div className="space-y-6 max-w-xl mx-auto">
             <div className="flex flex-wrap items-center gap-4">
                <label htmlFor="tool-select" className="font-semibold">Calculadora:</label>
                <select id="tool-select" value={activeTool} onChange={e => {setActiveTool(e.target.value as ToolId); setResult('')}} className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20">
                    {tools.map(tool => <option key={tool.id} value={tool.id}>{tool.name}</option>)}
                </select>
            </div>
            
            <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-4">
                {renderInputs()}
                <div className="text-center pt-2">
                    <Button onClick={handleCalculate}>Calcular</Button>
                </div>
            </div>

            {result && (
                <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg text-center">
                    <p className="text-xl font-bold text-light-primary dark:text-dark-primary">{result}</p>
                </div>
            )}
        </div>
    );
};

export default DateCalculator;
