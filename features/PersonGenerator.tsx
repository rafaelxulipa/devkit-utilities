
import React, { useState, useCallback } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { generatePerson } from '../utils/documentGenerators';

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 11M20 20l-1.5-1.5A9 9 0 003.5 13" />
    </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

interface PersonData {
    nome: string;
    cpf: string;
    rg: string;
}

const PersonGenerator: React.FC = () => {
    const [person, setPerson] = useState<PersonData | null>(null);
    const [isMasked, setIsMasked] = useState(true);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGenerate = useCallback(() => {
        setPerson(generatePerson(isMasked));
    }, [isMasked]);

    const handleCopy = (value: string, fieldName: string) => {
        copy(value);
        addToast(`${fieldName} copiado!`, 'success');
    };
    
    // Generate on first load
    useState(() => {
        handleGenerate();
    });

    const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
        <div className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-md">
            <span className="font-semibold text-light-secondary dark:text-dark-secondary">{label}:</span>
            <div className="flex items-center space-x-2">
                <span className="font-mono text-sm sm:text-base text-light-text dark:text-dark-text">{value}</span>
                <button 
                    onClick={() => handleCopy(value, label)} 
                    className="p-1 rounded text-light-secondary hover:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary"
                    aria-label={`Copiar ${label}`}
                >
                    <CopyIcon />
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            {person && (
                <div className="space-y-3 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg p-4">
                    <DataRow label="Nome" value={person.nome} />
                    <DataRow label="CPF" value={person.cpf} />
                    <DataRow label="RG" value={person.rg} />
                </div>
            )}
             <div className="flex justify-center">
                <Checkbox
                    label="Incluir pontuação"
                    checked={isMasked}
                    onChange={(e) => setIsMasked(e.target.checked)}
                />
            </div>
            <div className="flex justify-center">
                <Button onClick={handleGenerate} icon={<RefreshIcon />}>
                    Gerar Nova Pessoa
                </Button>
            </div>
        </div>
    );
};

export default PersonGenerator;
