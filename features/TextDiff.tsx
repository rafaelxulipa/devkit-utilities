
import React, { useState } from 'react';
import Button from '../components/Button';
import { diffLines, getDiffStats, DiffLine } from '../utils/textDiff';

const textareaClass = 'w-full h-56 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors font-mono text-sm';

const lineClasses: Record<DiffLine['type'], string> = {
    equal: 'text-light-text dark:text-dark-text',
    added: 'bg-green-500/10 text-green-700 dark:text-green-400',
    removed: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const linePrefix: Record<DiffLine['type'], string> = {
    equal: '  ',
    added: '+ ',
    removed: '- ',
};

const TextDiff: React.FC = () => {
    const [textA, setTextA] = useState('');
    const [textB, setTextB] = useState('');
    const [diff, setDiff] = useState<DiffLine[] | null>(null);

    const handleCompare = () => setDiff(diffLines(textA, textB));

    const stats = diff ? getDiffStats(diff) : null;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="text-a">
                        Texto Original
                    </label>
                    <textarea id="text-a" value={textA} onChange={e => setTextA(e.target.value)}
                        placeholder="Cole o texto original aqui..." className={textareaClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="text-b">
                        Texto Modificado
                    </label>
                    <textarea id="text-b" value={textB} onChange={e => setTextB(e.target.value)}
                        placeholder="Cole o texto modificado aqui..." className={textareaClass} />
                </div>
            </div>

            <div className="text-center">
                <Button onClick={handleCompare}>Comparar Textos</Button>
            </div>

            {diff && stats && (
                <div className="space-y-3">
                    <p className="text-center text-sm text-light-secondary dark:text-dark-secondary">
                        <span className="text-green-600 dark:text-green-400 font-semibold">+{stats.added}</span> adicionadas ·{' '}
                        <span className="text-red-600 dark:text-red-400 font-semibold">-{stats.removed}</span> removidas ·{' '}
                        {stats.unchanged} inalteradas
                    </p>
                    <div className="rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 overflow-x-auto">
                        <pre className="font-mono text-sm p-3 whitespace-pre">
                            {diff.length === 0
                                ? <span className="text-light-secondary dark:text-dark-secondary">Nenhum texto para comparar.</span>
                                : diff.map((line, idx) => (
                                    <div key={idx} className={lineClasses[line.type]}>
                                        {linePrefix[line.type]}{line.value || ' '}
                                    </div>
                                ))
                            }
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextDiff;
