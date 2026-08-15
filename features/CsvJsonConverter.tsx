
import React, { useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { csvToJson, jsonToCsv } from '../utils/csvJsonConverter';

type Mode = 'csv-to-json' | 'json-to-csv';

const textareaClass = 'w-full h-56 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors font-mono text-sm';
const selectClass = 'p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20';

const delimiters: { id: string; label: string }[] = [
    { id: ',', label: 'Vírgula (,)' },
    { id: ';', label: 'Ponto e vírgula (;)' },
    { id: '\t', label: 'Tabulação' },
];

const CsvJsonConverter: React.FC = () => {
    const [mode, setMode] = useState<Mode>('csv-to-json');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [delimiter, setDelimiter] = useState(',');
    const [hasHeader, setHasHeader] = useState(true);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleConvert = () => {
        setError('');
        setOutput('');
        try {
            if (mode === 'csv-to-json') {
                const result = csvToJson(input, delimiter, hasHeader);
                setOutput(JSON.stringify(result, null, 2));
            } else {
                setOutput(jsonToCsv(input, delimiter));
            }
        } catch {
            setError(mode === 'csv-to-json' ? 'Não foi possível converter o CSV.' : 'JSON inválido — verifique a sintaxe.');
        }
    };

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode);
        setInput('');
        setOutput('');
        setError('');
    };

    const handleCopy = () => {
        if (output) {
            copy(output);
            addToast('Copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-4">
                <label htmlFor="mode-select" className="font-semibold">Conversor:</label>
                <select id="mode-select" value={mode} onChange={e => handleModeChange(e.target.value as Mode)} className={selectClass}>
                    <option value="csv-to-json">CSV → JSON</option>
                    <option value="json-to-csv">JSON → CSV</option>
                </select>

                <label htmlFor="delimiter-select">Delimitador:</label>
                <select id="delimiter-select" value={delimiter} onChange={e => setDelimiter(e.target.value)} className={selectClass}>
                    {delimiters.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                </select>

                {mode === 'csv-to-json' && (
                    <Checkbox label="Primeira linha é cabeçalho" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} />
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="input-area">
                    {mode === 'csv-to-json' ? 'CSV' : 'JSON (array de objetos ou de arrays)'}
                </label>
                <textarea
                    id="input-area"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={mode === 'csv-to-json' ? 'nome,idade\nJoão,30' : '[{"nome":"João","idade":30}]'}
                    className={textareaClass}
                />
            </div>

            <div className="text-center">
                <Button onClick={handleConvert} disabled={!input.trim()}>Converter</Button>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {output && (
                <div className="relative">
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
                        {mode === 'csv-to-json' ? 'JSON' : 'CSV'}
                    </label>
                    <textarea readOnly value={output} className={textareaClass + ' pr-12'} />
                    <button
                        onClick={handleCopy}
                        className="absolute top-9 right-3 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                        aria-label="Copiar resultado"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CsvJsonConverter;
