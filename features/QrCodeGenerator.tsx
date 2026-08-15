
import React, { useState } from 'react';
import Button from '../components/Button';
import { generateQrCodeDataUrl, QrErrorCorrectionLevel } from '../utils/qrCodeGenerator';

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';
const labelClass = 'block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1';

const sizes = [200, 300, 400, 500];
const errorLevels: { id: QrErrorCorrectionLevel; label: string }[] = [
    { id: 'L', label: 'Baixa (~7%)' },
    { id: 'M', label: 'Média (~15%)' },
    { id: 'Q', label: 'Alta (~25%)' },
    { id: 'H', label: 'Máxima (~30%)' },
];

const QrCodeGenerator: React.FC = () => {
    const [text, setText] = useState('');
    const [size, setSize] = useState(300);
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QrErrorCorrectionLevel>('M');
    const [dataUrl, setDataUrl] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setError('');
        setDataUrl('');
        if (!text.trim()) {
            setError('Digite um texto, link ou informação para gerar o QR Code.');
            return;
        }
        try {
            const url = await generateQrCodeDataUrl({ text, size, errorCorrectionLevel });
            setDataUrl(url);
        } catch {
            setError('Não foi possível gerar o QR Code.');
        }
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div>
                <label className={labelClass} htmlFor="qr-text">Texto ou Link</label>
                <textarea
                    id="qr-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://exemplo.com.br ou qualquer texto..."
                    className={inputClass + ' h-24 resize-none'}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass} htmlFor="qr-size">Tamanho</label>
                    <select id="qr-size" value={size} onChange={e => setSize(Number(e.target.value))} className={inputClass}>
                        {sizes.map(s => <option key={s} value={s}>{s}x{s}px</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass} htmlFor="qr-error-level">Correção de Erro</label>
                    <select id="qr-error-level" value={errorCorrectionLevel}
                        onChange={e => setErrorCorrectionLevel(e.target.value as QrErrorCorrectionLevel)} className={inputClass}>
                        {errorLevels.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="text-center">
                <Button onClick={handleGenerate} disabled={!text.trim()}>Gerar QR Code</Button>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {dataUrl && (
                <div className="flex flex-col items-center gap-4 p-4 bg-light-bg dark:bg-dark-bg rounded-lg">
                    <img src={dataUrl} alt="QR Code gerado" className="rounded-md bg-white p-2" width={size} height={size} />
                    <a
                        href={dataUrl}
                        download="qrcode.png"
                        className="px-4 py-2 rounded-md font-semibold bg-light-secondary/20 dark:bg-dark-secondary/20 text-light-text dark:text-dark-text hover:bg-light-secondary/30 dark:hover:bg-dark-secondary/30 transition-all duration-300"
                    >
                        Baixar PNG
                    </a>
                </div>
            )}
        </div>
    );
};

export default QrCodeGenerator;
