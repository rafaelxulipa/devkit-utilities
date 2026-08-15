
import React, { useState, useCallback, useEffect } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Slider from '../components/Slider';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { generatePassphrase, estimateEntropyBits, getStrengthLabel } from '../utils/passphraseGenerator';

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

const separators: { id: string; label: string }[] = [
    { id: '-', label: 'Hífen (-)' },
    { id: '.', label: 'Ponto (.)' },
    { id: ' ', label: 'Espaço' },
    { id: '', label: 'Nenhum' },
];

const PassphraseGenerator: React.FC = () => {
    const [passphrase, setPassphrase] = useState('');
    const [wordCount, setWordCount] = useState(5);
    const [separator, setSeparator] = useState('-');
    const [capitalize, setCapitalize] = useState(true);
    const [includeNumber, setIncludeNumber] = useState(true);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGenerate = useCallback(() => {
        setPassphrase(generatePassphrase({ wordCount, separator, capitalize, includeNumber }));
    }, [wordCount, separator, capitalize, includeNumber]);

    useEffect(() => {
        handleGenerate();
    }, [handleGenerate]);

    const handleCopy = () => {
        if (passphrase) {
            copy(passphrase);
            addToast('Senha copiada!', 'success');
        }
    };

    const entropyBits = estimateEntropyBits(wordCount, includeNumber);
    const strength = getStrengthLabel(entropyBits);

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={passphrase}
                    placeholder="Sua senha memorável aparecerá aqui"
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

            <p className="text-center text-sm">
                Entropia estimada: <span className="font-mono font-semibold">{entropyBits} bits</span> —{' '}
                <span className={`font-semibold ${strength.className}`}>{strength.label}</span>
            </p>

            <div className="space-y-4 p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
                <Slider
                    label="Número de Palavras"
                    min={3}
                    max={10}
                    value={wordCount}
                    onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                />
                <div>
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="separator-select">
                        Separador
                    </label>
                    <select
                        id="separator-select"
                        value={separator}
                        onChange={(e) => setSeparator(e.target.value)}
                        className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                    >
                        {separators.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <Checkbox label="Capitalizar Palavras" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} />
                    <Checkbox label="Incluir Número no Final" checked={includeNumber} onChange={(e) => setIncludeNumber(e.target.checked)} />
                </div>
            </div>

            <Button onClick={handleGenerate} icon={<RefreshIcon />}>
                Gerar Nova Senha
            </Button>

            <p className="text-xs text-center text-light-secondary dark:text-dark-secondary">
                Gerada com crypto.getRandomValues (RNG criptograficamente seguro) a partir de uma lista de {' '}
                palavras em português — mais fácil de memorizar e digitar que uma senha aleatória.
            </p>
        </div>
    );
};

export default PassphraseGenerator;
