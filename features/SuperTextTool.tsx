
import React, { useState, useMemo } from 'react';
import Button from '../components/Button';
import * as TextUtils from '../utils/textUtils';

type ToolId = 'case' | 'sort' | 'reverse' | 'accent' | 'occurrence' | 'newline' | 'split' | 'html' | 'spellcheck';

const tools: { id: ToolId; name: string }[] = [
    { id: 'case', name: 'Maiúsculas/Minúsculas' },
    { id: 'sort', name: 'Ordenar Linhas' },
    { id: 'reverse', name: 'Inverter Texto' },
    { id: 'accent', name: 'Remover Acentos' },
    { id: 'occurrence', name: 'Contador de Ocorrências' },
    { id: 'newline', name: 'Gerenciar Quebras de Linha' },
    { id: 'split', name: 'Dividir Texto' },
    { id: 'html', name: 'Converter para HTML' },
    { id: 'spellcheck', name: 'Corretor Ortográfico' },
];

const SuperTextTool: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [activeTool, setActiveTool] = useState<ToolId>('case');
    
    // States for specific tools
    const [sortReverse, setSortReverse] = useState(false);
    const [wordToCount, setWordToCount] = useState('');
    const [splitDelimiter, setSplitDelimiter] = useState(',');
    const [newlineAction, setNewlineAction] = useState<'remove' | 'space'>('remove');

    const handleProcess = () => {
        let result = '';
        switch (activeTool) {
            case 'case':
                // Buttons will handle this directly
                break;
            case 'sort':
                result = TextUtils.sortLines(input, sortReverse);
                break;
            case 'reverse':
                result = TextUtils.reverseText(input);
                break;
            case 'accent':
                result = TextUtils.removeAccents(input);
                break;
            case 'occurrence':
                const count = TextUtils.countWordOccurrence(input, wordToCount);
                result = `A palavra "${wordToCount}" aparece ${count} vez(es).`;
                break;
            case 'newline':
                 result = TextUtils.manageNewlines(input, newlineAction);
                 break;
            case 'split':
                result = TextUtils.splitString(input, splitDelimiter);
                break;
            case 'html':
                result = TextUtils.textToHtml(input);
                break;
            case 'spellcheck':
                result = 'A correção é feita diretamente no campo de texto de entrada, usando o dicionário do seu navegador.';
                break;
        }
        if (activeTool !== 'case') {
            setOutput(result);
        }
    };
    
    const handleCaseChange = (type: TextUtils.CaseType) => {
        setOutput(TextUtils.changeCase(input, type));
    };

    const renderOptions = () => {
        switch (activeTool) {
            case 'case':
                return (
                    <div className="flex flex-wrap gap-2">
                        <Button variant="secondary" onClick={() => handleCaseChange('upper')}>MAIÚSCULAS</Button>
                        <Button variant="secondary" onClick={() => handleCaseChange('lower')}>minúsculas</Button>
                        <Button variant="secondary" onClick={() => handleCaseChange('title')}>Título</Button>
                        <Button variant="secondary" onClick={() => handleCaseChange('sentence')}>Sentença</Button>
                    </div>
                );
            case 'sort':
                return (
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={sortReverse} onChange={e => setSortReverse(e.target.checked)} className="form-checkbox h-5 w-5 rounded bg-light-bg dark:bg-dark-card border-light-secondary/50 dark:border-dark-secondary/50 text-light-primary dark:text-dark-primary" />
                        <span>Inverter Ordem</span>
                    </label>
                );
            case 'occurrence':
                 return (
                    <input
                        type="text"
                        value={wordToCount}
                        onChange={e => setWordToCount(e.target.value)}
                        placeholder="Palavra para contar"
                        className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                    />
                 );
            case 'newline':
                 return (
                    <div className="flex gap-4">
                        <label><input type="radio" value="remove" checked={newlineAction === 'remove'} onChange={() => setNewlineAction('remove')} /> Remover</label>
                        <label><input type="radio" value="space" checked={newlineAction === 'space'} onChange={() => setNewlineAction('space')} /> Trocar por Espaço</label>
                    </div>
                 );
            case 'split':
                return (
                    <div className="flex items-center gap-2">
                        <label>Delimitador:</label>
                        <input
                            type="text"
                            value={splitDelimiter}
                            onChange={e => setSplitDelimiter(e.target.value)}
                            className="p-2 w-24 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                        />
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
                <label htmlFor="tool-select" className="font-semibold">Ferramenta:</label>
                <select id="tool-select" value={activeTool} onChange={e => {setActiveTool(e.target.value as ToolId); setOutput('')}} className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20">
                    {tools.map(tool => <option key={tool.id} value={tool.id}>{tool.name}</option>)}
                </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Entrada"
                    spellCheck={activeTool === 'spellcheck'}
                    className="w-full h-64 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none"
                />
                 <textarea
                    readOnly
                    value={output}
                    placeholder="Saída"
                    className="w-full h-64 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:outline-none"
                />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
                {renderOptions()}
                {activeTool !== 'case' && activeTool !== 'spellcheck' && <Button onClick={handleProcess}>Processar</Button>}
            </div>
        </div>
    );
};

export default SuperTextTool;
