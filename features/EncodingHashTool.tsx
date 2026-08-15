
import React, { useState } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { encodeBase64, decodeBase64, hashMD5, hashSHA, ShaAlgorithm } from '../utils/encodingUtils';

type Mode = 'base64' | 'hash';
type Base64Direction = 'encode' | 'decode';
type HashAlgorithm = 'MD5' | ShaAlgorithm;

const hashAlgorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

const EncodingHashTool: React.FC = () => {
    const [mode, setMode] = useState<Mode>('base64');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [direction, setDirection] = useState<Base64Direction>('encode');
    const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleProcess = async () => {
        setError('');
        setOutput('');

        if (mode === 'base64') {
            try {
                setOutput(direction === 'encode' ? encodeBase64(input) : decodeBase64(input));
            } catch {
                setError('Não foi possível decodificar: texto não é um Base64 válido.');
            }
            return;
        }

        try {
            const hash = algorithm === 'MD5' ? hashMD5(input) : await hashSHA(input, algorithm);
            setOutput(hash);
        } catch {
            setError('Não foi possível gerar o hash.');
        }
    };

    const handleCopy = () => {
        if (output) {
            copy(output);
            addToast('Copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center gap-4">
                <label htmlFor="mode-select" className="font-semibold">Ferramenta:</label>
                <select
                    id="mode-select"
                    value={mode}
                    onChange={(e) => { setMode(e.target.value as Mode); setOutput(''); setError(''); }}
                    className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                >
                    <option value="base64">Base64 (codificar/decodificar)</option>
                    <option value="hash">Gerador de Hash (MD5, SHA-1, SHA-256...)</option>
                </select>

                {mode === 'base64' && (
                    <select
                        value={direction}
                        onChange={(e) => setDirection(e.target.value as Base64Direction)}
                        className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                    >
                        <option value="encode">Codificar (texto → Base64)</option>
                        <option value="decode">Decodificar (Base64 → texto)</option>
                    </select>
                )}

                {mode === 'hash' && (
                    <select
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
                        className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                    >
                        {hashAlgorithms.map(alg => <option key={alg} value={alg}>{alg}</option>)}
                    </select>
                )}
            </div>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'base64' && direction === 'decode' ? 'Cole o texto em Base64 aqui...' : 'Digite ou cole o texto aqui...'}
                className="w-full h-40 p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors font-mono text-sm"
            />

            <div className="text-center">
                <Button onClick={handleProcess} disabled={!input}>
                    {mode === 'base64' ? (direction === 'encode' ? 'Codificar' : 'Decodificar') : 'Gerar Hash'}
                </Button>
            </div>

            {error && (
                <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>
            )}

            {output && (
                <div className="relative">
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-32 p-4 pr-12 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm break-all"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                        aria-label="Copiar resultado"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
            )}

            {mode === 'hash' && algorithm === 'MD5' && (
                <p className="text-center text-xs text-light-secondary dark:text-dark-secondary">
                    MD5 é útil para checksums, mas não é seguro para senhas ou assinaturas criptográficas.
                </p>
            )}
        </div>
    );
};

export default EncodingHashTool;
