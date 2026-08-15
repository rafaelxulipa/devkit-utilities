
import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import { buildPreviewSrcDoc, downloadPlaygroundZip } from '../utils/playgroundExport';

const defaultHtml = '<h1>Olá, DevKit!</h1>\n<p>Edite o HTML, CSS e JS e veja o resultado ao vivo.</p>\n<button onclick="cumprimentar()">Clique aqui</button>';
const defaultCss = 'body {\n  font-family: sans-serif;\n  padding: 2rem;\n  color: #333;\n}\n\nh1 {\n  color: #2d78f7;\n}\n\nbutton {\n  cursor: pointer;\n}';
const defaultJs = "function cumprimentar() {\n  console.log('Olá do JavaScript!');\n}";

interface ConsoleEntry {
    id: number;
    type: 'log' | 'warn' | 'error' | 'info';
    message: string;
}

const textareaClass = 'w-full h-56 p-3 rounded-b-lg bg-light-bg dark:bg-dark-bg border border-t-0 border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none font-mono text-sm resize-none';
const paneHeaderClass = 'px-3 py-2 rounded-t-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-semibold text-sm';

const consoleColors: Record<ConsoleEntry['type'], string> = {
    log: 'text-light-text dark:text-dark-text',
    info: 'text-light-text dark:text-dark-text',
    warn: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
};

let consoleEntryId = 0;

const CodePlayground: React.FC = () => {
    const [html, setHtml] = useState(defaultHtml);
    const [css, setCss] = useState(defaultCss);
    const [js, setJs] = useState(defaultJs);
    const [srcDoc, setSrcDoc] = useState('');
    const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
    const [downloading, setDownloading] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setConsoleEntries([]);
            setSrcDoc(buildPreviewSrcDoc({ html, css, js }));
        }, 400);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.source !== 'devkit-playground') return;
            setConsoleEntries(prev => [
                ...prev.slice(-49),
                { id: consoleEntryId++, type: event.data.type, message: event.data.args.join(' ') },
            ]);
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleReset = () => {
        setHtml(defaultHtml);
        setCss(defaultCss);
        setJs(defaultJs);
    };

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await downloadPlaygroundZip({ html, css, js });
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap justify-end gap-3">
                <Button onClick={handleReset} variant="secondary">Reiniciar</Button>
                <Button onClick={handleDownload} disabled={downloading}>
                    {downloading ? 'Gerando ZIP...' : 'Baixar ZIP'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <div className={paneHeaderClass}>HTML</div>
                    <textarea value={html} onChange={e => setHtml(e.target.value)} spellCheck={false} className={textareaClass} />
                </div>
                <div>
                    <div className={paneHeaderClass}>CSS</div>
                    <textarea value={css} onChange={e => setCss(e.target.value)} spellCheck={false} className={textareaClass} />
                </div>
                <div>
                    <div className={paneHeaderClass}>JavaScript</div>
                    <textarea value={js} onChange={e => setJs(e.target.value)} spellCheck={false} className={textareaClass} />
                </div>
            </div>

            <div>
                <div className={paneHeaderClass}>Preview</div>
                <iframe
                    ref={iframeRef}
                    srcDoc={srcDoc}
                    sandbox="allow-scripts"
                    title="Preview"
                    className="w-full h-[32rem] rounded-b-lg bg-white border border-t-0 border-light-secondary/20 dark:border-dark-secondary/20"
                />
            </div>

            <div>
                <div className={paneHeaderClass}>Console {consoleEntries.length > 0 && `(${consoleEntries.length})`}</div>
                <div className="h-28 overflow-y-auto p-3 rounded-b-lg bg-light-bg dark:bg-dark-bg border border-t-0 border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-xs space-y-1">
                    {consoleEntries.length === 0 ? (
                        <span className="text-light-secondary dark:text-dark-secondary">Sem mensagens de console.</span>
                    ) : (
                        consoleEntries.map(entry => (
                            <div key={entry.id} className={consoleColors[entry.type]}>
                                {entry.type === 'error' ? '✗ ' : entry.type === 'warn' ? '⚠ ' : '›'} {entry.message}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodePlayground;
