
import React, { useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { generateCPF, generateCNPJ } from '../utils/documentGenerators';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const DocumentGenerator: React.FC = () => {
    const [document, setDocument] = useState('');
    const [isMasked, setIsMasked] = useState(true);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGenerate = (type: 'cpf' | 'cnpj') => {
        const generatedDoc = type === 'cpf' ? generateCPF(isMasked) : generateCNPJ(isMasked);
        setDocument(generatedDoc);
    };

    const handleCopy = () => {
        if (document) {
            copy(document);
            addToast('Documento copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={document}
                    placeholder="CPF ou CNPJ gerado aparecerá aqui"
                    className="w-full p-4 pr-12 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-lg text-center"
                />
                <button
                    onClick={handleCopy}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                    aria-label="Copiar documento"
                >
                    <CopyIcon />
                </button>
            </div>
            <div className="flex justify-center">
                <Checkbox
                    label="Incluir pontuação"
                    checked={isMasked}
                    onChange={(e) => setIsMasked(e.target.checked)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => handleGenerate('cpf')}>
                    Gerar CPF
                </Button>
                <Button onClick={() => handleGenerate('cnpj')} variant="secondary">
                    Gerar CNPJ
                </Button>
            </div>
        </div>
    );
};

export default DocumentGenerator;
