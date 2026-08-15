
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

type Language = 'json' | 'javascript' | 'typescript' | 'html' | 'css' | 'scss' | 'less' | 'markdown' | 'yaml' | 'graphql' | 'xml' | 'php' | 'sql';

const languageOptions: { id: Language, label: string, parser: string }[] = [
    { id: 'json', label: 'JSON', parser: 'json' },
    { id: 'javascript', label: 'JavaScript', parser: 'babel' },
    { id: 'typescript', label: 'TypeScript', parser: 'typescript' },
    { id: 'html', label: 'HTML', parser: 'html' },
    { id: 'css', label: 'CSS', parser: 'css' },
    { id: 'scss', label: 'SCSS', parser: 'scss' },
    { id: 'less', label: 'LESS', parser: 'less' },
    { id: 'markdown', label: 'Markdown', parser: 'markdown' },
    { id: 'yaml', label: 'YAML', parser: 'yaml' },
    { id: 'graphql', label: 'GraphQL', parser: 'graphql' },
    { id: 'xml', label: 'XML', parser: 'xml' },
    { id: 'php', label: 'PHP', parser: 'php' },
    { id: 'sql', label: 'SQL', parser: 'sql' },
];

const JsonNode: React.FC<{ data: any, nodeKey?: string }> = ({ data, nodeKey }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => setIsOpen(!isOpen);

    const type = typeof data;
    const isObject = type === 'object' && data !== null;
    const isArray = Array.isArray(data);
    const hasChildren = isObject && Object.keys(data).length > 0;
    
    const renderValue = () => {
        if (data === null) return <span className="text-gray-500">null</span>;
        if (type === 'string') return <span className="text-green-500">"{data}"</span>;
        if (type === 'number') return <span className="text-blue-500">{data}</span>;
        if (type === 'boolean') return <span className="text-purple-500">{String(data)}</span>;
        return null;
    };
    
    return (
        <div className="pl-4 border-l border-light-secondary/20 dark:border-dark-secondary/20">
            <div className="flex items-center">
                {hasChildren && (
                    <button onClick={toggleOpen} className="mr-1 text-xs">{isOpen ? '▼' : '►'}</button>
                )}
                {nodeKey && <span className="font-semibold text-light-accent dark:text-dark-accent mr-2">"{nodeKey}":</span>}
                {!hasChildren && renderValue()}
                {isArray && <span>[ {isOpen && data.length > 0 ? '' : '...'} ]</span>}
                {isObject && !isArray && <span>{'{'} {isOpen && Object.keys(data).length > 0 ? '' : '...'} {'}'}</span>}
            </div>

            {isOpen && hasChildren && (
                <div className="flex flex-col">
                    {Object.entries(data).map(([key, value]) => (
                        <JsonNode key={key} nodeKey={key} data={value} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CodeFormatter: React.FC = () => {
    const [input, setInput] = useState('{"exemplo": true, "dados": [1, 2, 3]}');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState<Language>('json');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const parsedJson = React.useMemo(() => {
        if (language === 'json' && output) {
            try {
                return JSON.parse(output);
            } catch {
                return null;
            }
        }
        return null;
    }, [language, output]);

    const handleFormat = useCallback(async () => {
        setError('');
        setLoading(true);
        try {
            if (language === 'sql') {
                const { format } = await import('https://esm.sh/sql-formatter@15.4.0');
                setOutput(format(input, { language: 'sql', tabWidth: 2, keywordCase: 'upper' }));
                return;
            }

            const prettier = await import('https://esm.sh/prettier@3.2.5/standalone');
            let plugins;
            let extraOptions: Record<string, unknown> = {};
            const selectedLanguage = languageOptions.find(l => l.id === language);

            switch (language) {
                case 'javascript':
                case 'json': {
                    // O parser "json" do Prettier standalone também vive no plugin babel (+ estree).
                    const [babel, estree] = await Promise.all([
                        import('https://esm.sh/prettier@3.2.5/plugins/babel'),
                        import('https://esm.sh/prettier@3.2.5/plugins/estree'),
                    ]);
                    plugins = [babel.default, estree.default];
                    break;
                }
                case 'typescript': {
                    const [ts, estree] = await Promise.all([
                        import('https://esm.sh/prettier@3.2.5/plugins/typescript'),
                        import('https://esm.sh/prettier@3.2.5/plugins/estree'),
                    ]);
                    plugins = [ts.default, estree.default];
                    break;
                }
                case 'html': {
                    const html = await import('https://esm.sh/prettier@3.2.5/plugins/html');
                    plugins = [html.default];
                    break;
                }
                case 'css':
                case 'scss':
                case 'less': {
                    const postcss = await import('https://esm.sh/prettier@3.2.5/plugins/postcss');
                    plugins = [postcss.default];
                    break;
                }
                case 'markdown': {
                    const markdown = await import('https://esm.sh/prettier@3.2.5/plugins/markdown');
                    plugins = [markdown.default];
                    break;
                }
                case 'yaml': {
                    const yaml = await import('https://esm.sh/prettier@3.2.5/plugins/yaml');
                    plugins = [yaml.default];
                    break;
                }
                case 'graphql': {
                    const graphql = await import('https://esm.sh/prettier@3.2.5/plugins/graphql');
                    plugins = [graphql.default];
                    break;
                }
                case 'xml': {
                    const xml = await import('https://esm.sh/@prettier/plugin-xml@3.4.2?bundle=true');
                    plugins = [xml.default];
                    // Sem isso, o plugin preserva o XML quase como veio (trata espaços como significativos).
                    extraOptions = { xmlWhitespaceSensitivity: 'ignore' };
                    break;
                }
                case 'php': {
                    const php = await import('https://esm.sh/@prettier/plugin-php@0.25.0?bundle=true');
                    plugins = [php.default];
                    break;
                }
                default:
                    plugins = [];
            }
            
            const formatted = await prettier.format(input, {
                parser: selectedLanguage?.parser || 'babel',
                plugins: plugins,
                tabWidth: 2,
                ...extraOptions,
            });
            setOutput(formatted);
        } catch (err: any) {
            setOutput('');
            setError(err.message || 'Ocorreu um erro ao formatar o código.');
        } finally {
            setLoading(false);
        }
    }, [input, language]);

    const handleCopy = () => {
        if (output) {
            copy(output);
            addToast('Código copiado!', 'success');
        }
    };

    return (
        <div className="space-y-4">
             <div className="flex flex-wrap items-center justify-between gap-4 p-3 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
                <div className="flex items-center gap-2">
                    <label htmlFor="lang-select" className="font-semibold">Linguagem:</label>
                    <select id="lang-select" value={language} onChange={e => setLanguage(e.target.value as Language)} className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20">
                        {languageOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                    </select>
                </div>
                <Button onClick={handleFormat} disabled={loading}>
                    {loading ? 'Formatando...' : 'Formatar / Embelezar'}
                </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Cole seu código aqui"
                    className="w-full h-80 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none font-mono"
                />
                 <div className="relative w-full h-80 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 overflow-auto font-mono">
                    {output && !error && (
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                            aria-label="Copiar código formatado"
                        >
                            <CopyIcon />
                        </button>
                    )}
                    {error ? (
                        <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>
                    ) : (
                         <pre className="whitespace-pre-wrap pr-8">{output}</pre>
                    )}
                 </div>
            </div>

            {parsedJson && (
                <div>
                    <h3 className="text-xl font-bold mb-2">Visualizador JSON</h3>
                    <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg font-mono text-sm">
                        <JsonNode data={parsedJson} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeFormatter;
