
import React, { useState, useCallback, useEffect } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Slider from '../components/Slider';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { generatePassword } from '../utils/passwordGenerator';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 11M20 20l-1.5-1.5A9 9 0 003.5 13" />
    </svg>
);

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGeneratePassword = useCallback(() => {
        const newPassword = generatePassword({
            length,
            includeUppercase,
            includeNumbers,
            includeSymbols,
        });
        setPassword(newPassword);
    }, [length, includeUppercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        handleGeneratePassword();
    }, [handleGeneratePassword]);

    const handleCopy = () => {
        if (password) {
            copy(password);
            addToast('Senha copiada!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={password}
                    placeholder="Sua senha segura aparecerá aqui"
                    className="w-full p-4 pr-12 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-lg"
                />
                <button 
                    onClick={handleCopy}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                    aria-label="Copiar senha"
                >
                    <CopyIcon />
                </button>
            </div>

            <div className="space-y-4 p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
                <Slider 
                    label="Tamanho da Senha"
                    min={8}
                    max={64}
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value, 10))}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <Checkbox 
                        label="Maiúsculas"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                    />
                    <Checkbox 
                        label="Números"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                    />
                    <Checkbox 
                        label="Símbolos"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                    />
                </div>
            </div>

            <Button onClick={handleGeneratePassword} icon={<RefreshIcon />}>
                Gerar Nova Senha
            </Button>
        </div>
    );
};

export default PasswordGenerator;
