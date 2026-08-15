
import React, { useState } from 'react';
import Button from '../components/Button';
import { decodeJwt, formatClaimTimestamp, DecodedJwt } from '../utils/jwtDecoder';

const textareaClass = 'w-full h-32 p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors font-mono text-sm break-all';

const JwtDecoder: React.FC = () => {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
    const [error, setError] = useState('');

    const handleDecode = () => {
        setError('');
        setDecoded(null);
        try {
            setDecoded(decodeJwt(token));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível decodificar o token.');
        }
    };

    const exp = decoded?.payload.exp;
    const expDate = formatClaimTimestamp(exp);
    const isExpired = typeof exp === 'number' && exp * 1000 < Date.now();

    const JsonBlock = ({ title, data }: { title: string; data: Record<string, unknown> }) => (
        <div>
            <h3 className="text-sm font-semibold text-light-secondary dark:text-dark-secondary mb-1">{title}</h3>
            <pre className="p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm overflow-x-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="jwt-input">
                    Token JWT
                </label>
                <textarea
                    id="jwt-input"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIs..."
                    className={textareaClass}
                />
            </div>

            <div className="text-center">
                <Button onClick={handleDecode} disabled={!token.trim()}>Decodificar</Button>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {decoded && (
                <div className="space-y-4">
                    {expDate && (
                        <p className={`text-center text-sm font-semibold ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {isExpired ? 'Token expirado em' : 'Token expira em'} {expDate}
                        </p>
                    )}
                    <JsonBlock title="Header" data={decoded.header} />
                    <JsonBlock title="Payload" data={decoded.payload} />
                    <div>
                        <h3 className="text-sm font-semibold text-light-secondary dark:text-dark-secondary mb-1">Assinatura</h3>
                        <p className="p-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm break-all">
                            {decoded.signature}
                        </p>
                    </div>
                </div>
            )}

            <p className="text-xs text-center text-light-secondary dark:text-dark-secondary">
                Apenas decodifica o conteúdo do token — a assinatura não é verificada.
            </p>
        </div>
    );
};

export default JwtDecoder;
