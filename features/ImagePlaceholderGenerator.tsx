
import React, { useState, useMemo } from 'react';
import Button from '../components/Button';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';

const ImagePlaceholderGenerator: React.FC = () => {
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const imageUrl = useMemo(() => {
        const w = Math.max(10, width);
        const h = Math.max(10, height);
        return `https://picsum.photos/${w}/${h}`;
    }, [width, height]);

    const handleCopy = () => {
        copy(imageUrl);
        addToast('URL da imagem copiada!', 'success');
    };

    const InputField: React.FC<{label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, ...props}) => (
        <div className="flex-1">
            <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1">{label}</label>
            <input
                type="number"
                min="10"
                step="10"
                className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20"
                {...props}
            />
        </div>
    );
    
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <InputField label="Largura (px)" value={width} onChange={e => setWidth(Number(e.target.value))} />
                    <InputField label="Altura (px)" value={height} onChange={e => setHeight(Number(e.target.value))} />
                </div>
                 <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary">URL Gerada:</label>
                    <div className="relative">
                         <input
                            type="text"
                            readOnly
                            value={imageUrl}
                            className="w-full p-3 pr-24 rounded-md bg-light-bg dark:bg-dark-bg font-mono text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                            <Button onClick={handleCopy}>Copiar</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-center">Preview</h3>
                <div className="flex justify-center items-center bg-light-bg dark:bg-dark-bg p-4 rounded-lg min-h-[200px]">
                    <img 
                        key={imageUrl}
                        src={imageUrl} 
                        alt={`Placeholder ${width}x${height}`}
                        className="max-w-full h-auto rounded-md shadow-lg"
                        style={{ maxWidth: width, maxHeight: 600 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImagePlaceholderGenerator;
