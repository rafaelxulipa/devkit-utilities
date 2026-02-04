
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const NumberGenerator: React.FC = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [allowDuplicates, setAllowDuplicates] = useState(false);
    const [result, setResult] = useState<number[]>([]);
    const [history, setHistory] = useState<number[][]>([]);

    const handleDraw = useCallback(() => {
        const minValue = parseInt(String(min), 10);
        const maxValue = parseInt(String(max), 10);
        const drawCount = parseInt(String(count), 10);

        if (isNaN(minValue) || isNaN(maxValue) || isNaN(drawCount) || minValue > maxValue || drawCount <= 0) {
            alert('Por favor, insira valores válidos.');
            return;
        }

        const range = maxValue - minValue + 1;
        if (!allowDuplicates && drawCount > range) {
            alert('Não é possível sortear mais números do que o disponível no intervalo sem repetição.');
            return;
        }

        const drawnNumbers: number[] = [];
        const numberPool = Array.from({ length: range }, (_, i) => minValue + i);

        for (let i = 0; i < drawCount; i++) {
            if (allowDuplicates) {
                const randomNumber = Math.floor(Math.random() * range) + minValue;
                drawnNumbers.push(randomNumber);
            } else {
                const randomIndex = Math.floor(Math.random() * numberPool.length);
                const [removedNumber] = numberPool.splice(randomIndex, 1);
                drawnNumbers.push(removedNumber);
            }
        }
        
        setResult(drawnNumbers);
        setHistory(prev => [drawnNumbers, ...prev].slice(0, 10)); // Keep last 10 results
    }, [min, max, count, allowDuplicates]);

    const InputField: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, ...props}) => (
        <div>
            <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">{label}</label>
            <input
                type="number"
                className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                {...props}
            />
        </div>
    );

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField label="Mínimo" value={min} onChange={e => setMin(Number(e.target.value))} />
                    <InputField label="Máximo" value={max} onChange={e => setMax(Number(e.target.value))} />
                    <InputField label="Quantidade" value={count} onChange={e => setCount(Number(e.target.value))} />
                </div>
                <div className="pt-2">
                    <Checkbox label="Permitir números repetidos" checked={allowDuplicates} onChange={e => setAllowDuplicates(e.target.checked)} />
                </div>
                <div className="text-center pt-2">
                    <Button onClick={handleDraw}>Sortear</Button>
                </div>
            </div>

            {result.length > 0 && (
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold">Resultado:</h3>
                    <div className="flex flex-wrap justify-center gap-3 bg-light-bg dark:bg-dark-bg p-4 rounded-lg">
                        {result.map((num, index) => (
                            <span key={index} className="px-4 py-2 text-2xl font-bold bg-light-primary dark:bg-dark-primary text-white rounded-md shadow">
                                {num}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            
            {history.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-center">Histórico Recente:</h3>
                    <ul className="space-y-2 text-center text-sm text-light-secondary dark:text-dark-secondary">
                        {history.map((h, i) => (
                            <li key={i} className="p-2 bg-light-bg dark:bg-dark-bg rounded-md opacity-80">
                                {h.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NumberGenerator;
