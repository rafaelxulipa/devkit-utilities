
import React, { useState } from 'react';
import Button from '../components/Button';
import * as Validators from '../utils/documentValidators';

type ValidationStatus = 'idle' | 'valid' | 'invalid';
interface ValidationResult {
    status: ValidationStatus;
    message: string;
}

type DocumentType = 
    | 'cpf' 
    | 'cnpj' 
    | 'cnh' 
    | 'pis' 
    | 'renavam' 
    | 'titulo' 
    | 'cartao'
    | 'ie_sp'
    | 'rg_sp'
    | 'certidao';

const documentOptions: { id: DocumentType; label: string, placeholder: string }[] = [
    { id: 'cpf', label: 'CPF', placeholder: 'Digite o CPF' },
    { id: 'cnpj', label: 'CNPJ', placeholder: 'Digite o CNPJ' },
    { id: 'cnh', label: 'CNH', placeholder: 'Digite a CNH' },
    { id: 'pis', label: 'PIS/PASEP', placeholder: 'Digite o PIS/PASEP' },
    { id: 'renavam', label: 'RENAVAM', placeholder: 'Digite o RENAVAM' },
    { id: 'titulo', label: 'Título de Eleitor', placeholder: 'Digite o Título de Eleitor' },
    { id: 'cartao', label: 'Cartão de Crédito', placeholder: 'Digite o número do Cartão' },
    { id: 'ie_sp', label: 'Inscrição Estadual (SP)', placeholder: 'Digite a Inscrição Estadual de SP' },
    { id: 'rg_sp', label: 'RG (SP)', placeholder: 'Digite o RG de SP' },
    { id: 'certidao', label: 'Certidão Civil (32 dígitos)', placeholder: 'Digite o número da certidão' },
];


const DocumentValidator: React.FC = () => {
    const [document, setDocument] = useState('');
    const [selectedType, setSelectedType] = useState<DocumentType>('cpf');
    const [result, setResult] = useState<ValidationResult>({ status: 'idle', message: '' });

    const handleValidation = () => {
        const cleanDoc = document.replace(/[^\d]/g, '');
        let isValid = false;
        let message = '';

        switch(selectedType) {
            case 'cpf':
                isValid = Validators.validateCPF(cleanDoc);
                message = isValid ? 'CPF válido!' : 'CPF inválido.';
                break;
            case 'cnpj':
                isValid = Validators.validateCNPJ(cleanDoc);
                message = isValid ? 'CNPJ válido!' : 'CNPJ inválido.';
                break;
            case 'cnh':
                isValid = Validators.validateCNH(cleanDoc);
                message = isValid ? 'CNH válida!' : 'CNH inválida.';
                break;
            case 'pis':
                isValid = Validators.validatePIS(cleanDoc);
                message = isValid ? 'PIS/PASEP válido!' : 'PIS/PASEP inválido.';
                break;
            case 'renavam':
                 isValid = Validators.validateRENAVAM(cleanDoc);
                 message = isValid ? 'RENAVAM válido!' : 'RENAVAM inválido.';
                 break;
            case 'titulo':
                isValid = Validators.validateTituloEleitor(cleanDoc);
                message = isValid ? 'Título de Eleitor válido!' : 'Título de Eleitor inválido.';
                break;
            case 'cartao':
                isValid = Validators.validateLuhn(cleanDoc);
                message = isValid ? 'Número de Cartão de Crédito válido!' : 'Número de Cartão de Crédito inválido.';
                break;
            case 'ie_sp':
                 isValid = Validators.validateIE_SP(cleanDoc);
                 message = isValid ? 'Inscrição Estadual (SP) válida!' : 'Inscrição Estadual (SP) inválida.';
                 break;
            case 'rg_sp':
                isValid = Validators.validateRG_SP(cleanDoc);
                message = isValid ? 'RG (SP) válido!' : 'RG (SP) inválido.';
                break;
            case 'certidao':
                isValid = Validators.validateCertidao(cleanDoc);
                message = isValid ? 'Certidão válida!' : 'Certidão inválida. Verifique o formato de 32 dígitos.';
                break;
            default:
                setResult({ status: 'invalid', message: 'Tipo de documento não selecionado.' });
                return;
        }
        
        setResult({ status: isValid ? 'valid' : 'invalid', message });
    };

    const resultClasses: Record<ValidationStatus, string> = {
        idle: 'hidden',
        valid: 'text-green-600 dark:text-green-400',
        invalid: 'text-red-600 dark:text-red-400'
    };
    
    const currentPlaceholder = documentOptions.find(opt => opt.id === selectedType)?.placeholder || 'Digite o documento';

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="space-y-4">
                <div>
                    <label htmlFor="doc-type-select" className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">
                        Tipo de Documento
                    </label>
                    <select
                        id="doc-type-select"
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value as DocumentType);
                            setDocument('');
                            setResult({ status: 'idle', message: '' });
                        }}
                        className="w-full p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors"
                    >
                        {documentOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                     <input
                        type="text"
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        placeholder={currentPlaceholder}
                        className="w-full p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors text-center"
                        aria-label="Documento para validação"
                    />
                     {result.status !== 'idle' && (
                        <p className={`text-center text-sm font-semibold mt-2 ${resultClasses[result.status]}`}>
                            {result.message}
                        </p>
                    )}
                </div>
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
