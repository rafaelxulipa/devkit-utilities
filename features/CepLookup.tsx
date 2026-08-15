
import React, { useState } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { fetchCep, CepResult } from '../utils/cepUtils';

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';

const CepLookup: React.FC = () => {
    const [cepInput, setCepInput] = useState('');
    const [result, setResult] = useState<CepResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleSearch = async () => {
        setError('');
        setResult(null);
        setLoading(true);
        try {
            const data = await fetchCep(cepInput);
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível consultar o CEP.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleCopy = () => {
        if (!result) return;
        const endereco = `${result.logradouro}, ${result.bairro}, ${result.localidade}/${result.uf} - CEP ${result.cep}`;
        copy(endereco);
        addToast('Endereço copiado!', 'success');
    };

    const ResultLine = ({ label, value }: { label: string; value: string }) => (
        !value ? null : (
            <div className="flex justify-between items-baseline py-2 border-b border-light-secondary/10 dark:border-dark-secondary/10 last:border-0">
                <span className="text-sm text-light-secondary dark:text-dark-secondary">{label}</span>
                <span className="font-medium text-right">{value}</span>
            </div>
        )
    );

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div className="flex gap-3">
                <input
                    type="text"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="00000-000"
                    maxLength={9}
                    className={inputClass}
                    aria-label="CEP para consulta"
                />
                <Button onClick={handleSearch} disabled={loading || !cepInput}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </Button>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {result && (
                <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg">
                    <ResultLine label="CEP" value={result.cep} />
                    <ResultLine label="Logradouro" value={result.logradouro} />
                    <ResultLine label="Complemento" value={result.complemento} />
                    <ResultLine label="Bairro" value={result.bairro} />
                    <ResultLine label="Cidade/UF" value={`${result.localidade}/${result.uf}`} />
                    <ResultLine label="DDD" value={result.ddd} />
                    <div className="text-center pt-4">
                        <Button onClick={handleCopy} variant="secondary">Copiar Endereço</Button>
                    </div>
                </div>
            )}

            <p className="text-xs text-center text-light-secondary dark:text-dark-secondary">
                Consulta realizada em tempo real via ViaCEP — nenhum dado é armazenado.
            </p>
        </div>
    );
};

export default CepLookup;
