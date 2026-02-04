
import React, { useState, useMemo } from 'react';
import { numberToWords } from '../utils/numberToWords';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/Button';

const NumberToWords: React.FC = () => {
    const [input, setInput] = useState('123456');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const result = useMemo(() => {
        if (input.trim() === '') return 'Digite um número.';
        const num = parseInt(input, 10);
        if (isNaN(num)) return 'Entrada inválida.';
        return numberToWords(num);
    }, [input]);
    
    const handleCopy = () => {
        if (result && !result.includes('inválida') && !result.includes('Digite')) {
            copy(result);
            addToast('Texto copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div>
                <label htmlFor="number-input" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
                    Digite um número
                </label>
                <input
                    id="number-input"
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ex: 1234"
                    className="w-full p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none"
                />
            </div>
            
            <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg min-h-[6rem] flex items-center justify-center text-center">
                <p className="text-lg font-semibold text-light-primary dark:text-dark-primary">{result}</p>
            </div>
            
             <div className="text-center">
                <Button onClick={handleCopy}>
                    Copiar Texto
                </Button>
            </div>
        </div>
    );
};

export default NumberToWords;
