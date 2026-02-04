
import React, { useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { generateCPF, generateCNPJ, generateRG, generateCNH, generateTituloEleitor, generatePIS } from '../utils/documentGenerators';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

type DocumentType = 'cpf' | 'cnpj' | 'rg' | 'cnh' | 'titulo' | 'pis';

const documentOptions: { id: DocumentType; label: string }[] = [
    { id: 'cpf', label: 'CPF' },
    { id: 'cnpj', label: 'CNPJ' },
    { id: 'rg', label: 'RG' },
    { id: 'cnh', label: 'CNH' },
    { id: 'titulo', label: 'Título de Eleitor' },
    { id: 'pis', label: 'PIS/PASEP' },
];

const DocumentGenerator: React.FC = () => {
    const [document, setDocument] = useState('');
    const [isMasked, setIsMasked] = useState(true);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGenerate = (type: DocumentType) => {
        let generatedDoc = '';
        switch (type) {
            case 'cpf': generatedDoc = generateCPF(isMasked); break;
            case 'cnpj': generatedDoc = generateCNPJ(isMasked); break;
            case 'rg': generatedDoc = generateRG(isMasked); break;
            case 'cnh': generatedDoc = generateCNH(isMasked); break;
            case 'titulo': generatedDoc = generateTituloEleitor(isMasked); break;
            case 'pis': generatedDoc = generatePIS(isMasked); break;
        }
        setDocument(generatedDoc);
    };

    const handleCopy = () => {
        if (document) {
            copy(document);
            addToast('Documento copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={document}
                    placeholder="Seu documento gerado aparecerá aqui"
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
            <div className="flex flex-wrap gap-3 justify-center">
                {documentOptions.map(option => (
                     <Button key={option.id} onClick={() => handleGenerate(option.id)} variant="primary">
                        Gerar {option.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default DocumentGenerator;
