
import React, { useState } from 'react';
import Button from '../components/Button';
import { validateCPF, validateCNPJ } from '../utils/documentValidators';

type ValidationStatus = 'idle' | 'valid' | 'invalid';
interface ValidationResult {
    status: ValidationStatus;
    message: string;
}

const DocumentValidator: React.FC = () => {
    const [document, setDocument] = useState('');
    const [result, setResult] = useState<ValidationResult>({ status: 'idle', message: '' });

    const handleValidation = () => {
        const cleanDoc = document.replace(/[^\d]/g, ''); // Remove formatting

        if (cleanDoc.length === 11) {
            if (validateCPF(cleanDoc)) {
                setResult({ status: 'valid', message: 'CPF válido!' });
            } else {
                setResult({ status: 'invalid', message: 'CPF inválido.' });
            }
        } else if (cleanDoc.length === 14) {
            if (validateCNPJ(cleanDoc)) {
                setResult({ status: 'valid', message: 'CNPJ válido!' });
            } else {
                setResult({ status: 'invalid', message: 'CNPJ inválido.' });
            }
        } else {
             setResult({ status: 'invalid', message: 'Entrada inválida. Verifique o número de dígitos.' });
        }
    };

    const resultClasses: Record<ValidationStatus, string> = {
        idle: 'hidden',
        valid: 'text-green-600 dark:text-green-400',
        invalid: 'text-red-600 dark:text-red-400'
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="space-y-2">
                <input
                    type="text"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder="Digite o CPF ou CNPJ (com ou sem pontuação)"
                    className="w-full p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors text-center"
                    aria-label="CPF ou CNPJ para validação"
                />
                {result.status !== 'idle' && (
                    <p className={`text-center text-sm font-semibold ${resultClasses[result.status]}`}>
                        {result.message}
                    </p>
                )}
            </div>
            
            <div className="flex justify-center">
                <Button onClick={handleValidation} disabled={!document}>
                    Validar
                </Button>
            </div>
        </div>
    );
};

export default DocumentValidator;
