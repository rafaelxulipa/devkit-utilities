
import React, { useMemo, useState } from 'react';
import Checkbox from '../components/Checkbox';
import { testRegex, buildHighlightSegments } from '../utils/regexTester';

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors font-mono';
const textareaClass = inputClass + ' h-40';

const flagOptions: { id: string; label: string }[] = [
    { id: 'g', label: 'g (global)' },
    { id: 'i', label: 'i (ignorar maiúsc./minúsc.)' },
    { id: 'm', label: 'm (multilinha)' },
    { id: 's', label: 's (. combina \\n)' },
];

const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState<Set<string>>(new Set(['g']));
    const [text, setText] = useState('');

    const toggleFlag = (flag: string) => {
        setFlags(prev => {
            const next = new Set(prev);
            if (next.has(flag)) next.delete(flag); else next.add(flag);
            return next;
        });
    };

    const flagsString = Array.from(flags).join('');
    const { matches, error } = useMemo(() => testRegex(pattern, flagsString, text), [pattern, flagsString, text]);
    const segments = useMemo(() => buildHighlightSegments(text, matches), [text, matches]);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="regex-pattern">
                    Expressão Regular
                </label>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-light-secondary dark:text-dark-secondary">/</span>
                    <input id="regex-pattern" type="text" value={pattern} onChange={e => setPattern(e.target.value)}
                        placeholder="\d+" className={inputClass} />
                    <span className="font-mono text-light-secondary dark:text-dark-secondary">/{flagsString}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {flagOptions.map(f => (
                    <Checkbox key={f.id} label={f.label} checked={flags.has(f.id)} onChange={() => toggleFlag(f.id)} />
                ))}
            </div>

            <div>
                <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="regex-text">
                    Texto de Teste
                </label>
                <textarea id="regex-text" value={text} onChange={e => setText(e.target.value)}
                    placeholder="Cole aqui o texto para testar contra a expressão..." className={textareaClass} />
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {!error && pattern && text && (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-light-secondary dark:text-dark-secondary mb-1">
                            Texto com {matches.length} {matches.length === 1 ? 'ocorrência' : 'ocorrências'}
                        </h3>
                        <div className="p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm whitespace-pre-wrap break-words">
                            {segments.map((seg, idx) => seg.isMatch
                                ? <mark key={idx} className="bg-yellow-300/60 dark:bg-yellow-500/40 rounded px-0.5">{seg.text}</mark>
                                : <span key={idx}>{seg.text}</span>
                            )}
                        </div>
                    </div>

                    {matches.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-light-secondary dark:text-dark-secondary mb-1">Ocorrências</h3>
                            <div className="rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 divide-y divide-light-secondary/10 dark:divide-dark-secondary/10">
                                {matches.map((m, idx) => (
                                    <div key={idx} className="p-3 text-sm">
                                        <span className="font-mono">
                                            <span className="text-light-secondary dark:text-dark-secondary">[{m.index}]</span>{' '}
                                            <span className="font-semibold">{m.match || '(vazio)'}</span>
                                        </span>
                                        {m.groups.length > 0 && (
                                            <div className="mt-1 text-light-secondary dark:text-dark-secondary font-mono text-xs">
                                                grupos: {m.groups.map((g, gi) => `$${gi + 1}=${g ?? '—'}`).join('  ')}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <p className="text-xs text-center text-light-secondary dark:text-dark-secondary">
                Padrões muito complexos aplicados a textos grandes podem travar a aba — teste com moderação.
            </p>
        </div>
    );
};

export default RegexTester;
