
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';

type Language = 'json' | 'javascript' | 'html' | 'css';

const languageOptions: { id: Language, label: string, parser: string }[] = [
    { id: 'json', label: 'JSON', parser: 'json' },
    { id: 'javascript', label: 'JavaScript', parser: 'babel' },
    { id: 'html', label: 'HTML', parser: 'html' },
    { id: 'css', label: 'CSS', parser: 'css' },
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
            const prettier = await import('https://esm.sh/prettier@3.2.5/standalone');
            let plugins;
            const selectedLanguage = languageOptions.find(l => l.id === language);
            
            switch (language) {
                case 'javascript':
                    const [babel, estree] = await Promise.all([
                        import('https://esm.sh/prettier@3.2.5/plugins/babel'),
                        import('https://esm.sh/prettier@3.2.5/plugins/estree'),
                    ]);
                    plugins = [babel.default, estree.default];
                    break;
                case 'html':
                    const html = await import('https://esm.sh/prettier@3.2.5/plugins/html');
                    plugins = [html.default];
                    break;
                case 'css':
                    const postcss = await import('https://esm.sh/prettier@3.2.5/plugins/postcss');
                    plugins = [postcss.default];
                    break;
                 case 'json':
                    // JSON parser is built-in
                    plugins = [];
                    break;
                default:
                    plugins = [];
            }
            
            const formatted = await prettier.format(input, {
                parser: selectedLanguage?.parser || 'babel',
                plugins: plugins,
                tabWidth: 2,
            });
            setOutput(formatted);
        } catch (err: any) {
            setOutput('');
            setError(err.message || 'Ocorreu um erro ao formatar o código.');
        } finally {
            setLoading(false);
        }
    }, [input, language]);
    
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
                 <div className="w-full h-80 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 overflow-auto font-mono">
                    {error ? (
                        <pre className="text-red-500 whitespace-pre-wrap">{error}</pre>
                    ) : (
                         <pre className="whitespace-pre-wrap">{output}</pre>
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
