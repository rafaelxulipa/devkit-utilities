
import React, { useMemo, useState } from 'react';
import { regexPatterns, RegexPatternDef } from '../utils/regexPatterns';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const PatternCard: React.FC<{ pattern: RegexPatternDef }> = ({ pattern }) => {
    const [testValue, setTestValue] = useState(pattern.example);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const isMatch = useMemo(() => {
        try {
            return new RegExp(pattern.pattern, pattern.flags).test(testValue);
        } catch {
            return false;
        }
    }, [pattern, testValue]);

    const handleCopy = () => {
        copy(pattern.pattern);
        addToast('Padrão copiado!', 'success');
    };

    return (
        <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-3">
            <div>
                <h3 className="font-semibold">{pattern.label}</h3>
                <p className="text-sm text-light-secondary dark:text-dark-secondary">{pattern.description}</p>
            </div>

            <div className="relative">
                <code className="block w-full p-2 pr-10 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm break-all">
                    {pattern.pattern}
                </code>
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                    aria-label={`Copiar padrão de ${pattern.label}`}
                >
                    <CopyIcon />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={testValue}
                    onChange={e => setTestValue(e.target.value)}
                    className="flex-1 p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm"
                    aria-label={`Testar valor contra o padrão de ${pattern.label}`}
                />
                <span className={`text-lg ${isMatch ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isMatch ? '✓' : '✗'}
                </span>
            </div>
        </div>
    );
};

const RegexPatternLibrary: React.FC = () => {
    const [search, setSearch] = useState('');

    const filtered = regexPatterns.filter(p =>
        p.label.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar padrão (e-mail, CPF, URL...)"
                className="w-full p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(p => <PatternCard key={p.id} pattern={p} />)}
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-light-secondary dark:text-dark-secondary">Nenhum padrão encontrado.</p>
            )}
        </div>
    );
};

export default RegexPatternLibrary;
