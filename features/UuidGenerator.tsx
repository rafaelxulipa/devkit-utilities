
import React, { useState, useCallback, useEffect } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 11M20 20l-1.5-1.5A9 9 0 003.5 13" />
    </svg>
);

const UuidGenerator: React.FC = () => {
    const [uuid, setUuid] = useState('');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGenerateUuid = useCallback(() => {
        // crypto.randomUUID() is a modern, secure, and built-in way to generate UUIDs.
        if (crypto.randomUUID) {
            setUuid(crypto.randomUUID());
        } else {
            // Basic fallback for older browsers. Not cryptographically secure but serves the purpose.
            const fallbackUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            setUuid(fallbackUuid);
            console.warn('crypto.randomUUID() not available. Using a less secure fallback.');
        }
    }, []);

    useEffect(() => {
        handleGenerateUuid();
    }, [handleGenerateUuid]);

    const handleCopy = () => {
        if (uuid) {
            copy(uuid);
            addToast('UUID copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={uuid}
                    placeholder="Seu UUID aparecerá aqui"
                    className="w-full p-4 pr-12 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-lg text-center"
                    aria-label="Generated UUID"
                />
                <button
                    onClick={handleCopy}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                    aria-label="Copiar UUID"
                >
                    <CopyIcon />
                </button>
            </div>
            <div className="flex justify-center">
                <Button onClick={handleGenerateUuid} icon={<RefreshIcon />}>
                    Gerar Novo UUID
                </Button>
            </div>
        </div>
    );
};

export default UuidGenerator;
