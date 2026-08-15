
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';

type Language = 'json' | 'javascript' | 'html' | 'css';

const languageOptions: { id: Language; label: string }[] = [
    { id: 'json', label: 'JSON' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
];

const minifyByLanguage = async (language: Language, code: string): Promise<string> => {
    switch (language) {
        case 'json':
            return JSON.stringify(JSON.parse(code));
        case 'javascript': {
            const { minify } = await import('https://esm.sh/terser@5.31.0');
            const result = await minify(code);
            if (!result.code) throw new Error('Não foi possível minificar este JavaScript.');
            return result.code;
        }
        case 'css': {
            const { minify } = await import('https://esm.sh/csso@5.0.5');
            return minify(code).css;
        }
        case 'html': {
            const { minify } = await import('https://esm.sh/html-minifier-terser@7.2.0');
            return minify(code, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            });
        }
    }
};

const byteLength = (text: string): number => new TextEncoder().encode(text).length;

const CodeMinifier: React.FC = () => {
    const [input, setInput] = useState('{\n  "exemplo": true,\n  "dados": [1, 2, 3]\n}');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState<Language>('json');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleMinify = useCallback(async () => {
        setError('');
        setOutput('');
        setLoading(true);
        try {
            const minified = await minifyByLanguage(language, input);
            setOutput(minified);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao minificar o código.');
        } finally {
            setLoading(false);
        }
    }, [input, language]);

    const handleCopy = () => {
        if (output) {
            copy(output);
            addToast('Código minificado copiado!', 'success');
        }
    };

    const originalSize = byteLength(input);
    const minifiedSize = output ? byteLength(output) : 0;
    const savings = output && originalSize > 0 ? Math.round((1 - minifiedSize / originalSize) * 100) : null;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
                <div className="flex items-center gap-2">
                    <label htmlFor="lang-select" className="font-semibold">Linguagem:</label>
                    <select id="lang-select" value={language} onChange={e => setLanguage(e.target.value as Language)} className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20">
                        {languageOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                    </select>
                </div>
                <Button onClick={handleMinify} disabled={loading || !input.trim()}>
                    {loading ? 'Minificando...' : 'Minificar'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Cole seu código aqui"
                    className="w-full h-80 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none font-mono text-sm"
                />
                <div className="relative w-full h-80 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 overflow-auto font-mono text-sm">
                    {output && (
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                            aria-label="Copiar código minificado"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    )}
                    {error ? (
                        <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>
                    ) : (
                        <pre className="whitespace-pre-wrap break-all pr-8">{output}</pre>
                    )}
                </div>
            </div>

            {savings !== null && (
                <p className="text-center text-sm text-light-secondary dark:text-dark-secondary">
                    {originalSize} bytes → <span className="font-semibold text-light-text dark:text-dark-text">{minifiedSize} bytes</span>
                    {' '}(<span className={savings > 0 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>{savings}% menor</span>)
                </p>
            )}
        </div>
    );
};

export default CodeMinifier;
