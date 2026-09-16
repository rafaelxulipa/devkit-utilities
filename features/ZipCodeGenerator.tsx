import React, { useState } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import {
    BRAZIL_STATES,
    CountryCode,
    GeneratedPostalCode,
    generateBrazilCep,
    generatePortugalPostalCode,
    generateUkPostcode,
    generateUsZip,
} from '../utils/zipCodeGenerator';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';

const countryOptions: { id: CountryCode; label: string; flag: string }[] = [
    { id: 'BR', label: 'Brasil (CEP)', flag: '🇧🇷' },
    { id: 'US', label: 'Estados Unidos (ZIP)', flag: '🇺🇸' },
    { id: 'GB', label: 'Reino Unido (Postcode)', flag: '🇬🇧' },
    { id: 'PT', label: 'Portugal (Código Postal)', flag: '🇵🇹' },
];

const ResultLine = ({ label, value }: { label: string; value: string }) => (
    !value ? null : (
        <div className="flex justify-between items-baseline py-2 border-b border-light-secondary/10 dark:border-dark-secondary/10 last:border-0">
            <span className="text-sm text-light-secondary dark:text-dark-secondary">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    )
);

const ZipCodeGenerator: React.FC = () => {
    const [country, setCountry] = useState<CountryCode>('BR');
    const [uf, setUf] = useState('');
    const [result, setResult] = useState<GeneratedPostalCode | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleGenerate = async () => {
        setError('');
        setLoading(true);
        try {
            let data: GeneratedPostalCode;
            switch (country) {
                case 'BR': data = await generateBrazilCep(uf || undefined); break;
                case 'GB': data = await generateUkPostcode(); break;
                case 'US': data = generateUsZip(); break;
                case 'PT': data = generatePortugalPostalCode(); break;
            }
            setResult(data);
        } catch (err) {
            setResult(null);
            setError(err instanceof Error ? err.message : 'Não foi possível gerar o código postal.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!result) return;
        copy(result.code);
        addToast('Código postal copiado!', 'success');
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div>
                <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="country-select">
                    País
                </label>
                <select
                    id="country-select"
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value as CountryCode);
                        setUf('');
                        setResult(null);
                        setError('');
                    }}
                    className={inputClass}
                >
                    {countryOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.flag} {opt.label}</option>
                    ))}
                </select>
            </div>

            {country === 'BR' && (
                <div>
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="uf-select">
                        Estado (opcional)
                    </label>
                    <select
                        id="uf-select"
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Aleatório (qualquer estado)</option>
                        {BRAZIL_STATES.map(s => (
                            <option key={s.uf} value={s.uf}>{s.name} ({s.uf})</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex justify-center">
                <Button onClick={handleGenerate} disabled={loading}>
                    {loading ? 'Gerando...' : 'Gerar Código Postal'}
                </Button>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {result && (
                <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            value={result.code}
                            className="w-full p-4 pr-12 rounded-lg bg-light-card dark:bg-dark-card border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-xl text-center"
                            aria-label="Código postal gerado"
                        />
                        <button
                            onClick={handleCopy}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                            aria-label="Copiar código postal"
                        >
                            <CopyIcon />
                        </button>
                    </div>

                    <div>
                        <ResultLine label="Cidade" value={result.city} />
                        <ResultLine label="Região/UF" value={result.region} />
                        {result.extra && <ResultLine label="Logradouro/Bairro" value={result.extra} />}
                    </div>

                    <p className="text-xs text-center text-light-secondary dark:text-dark-secondary">
                        {result.sourceLabel}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ZipCodeGenerator;
