
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { hexToRgb, hexToHsl, rgbToHex } from '../utils/colorGenerator';
import Button from '../components/Button';

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const getInitialColor = (): string => {
    return localStorage.getItem('color-picker-color') || '#7aa2f7';
};

const ColorValue: React.FC<{
    label: string;
    value: string;
    onCopy: (value: string, format: string) => void;
}> = ({ label, value, onCopy }) => (
    <div className="flex items-center justify-between p-3 bg-light-bg dark:bg-dark-bg rounded-md">
        <span className="font-semibold">{label}:</span>
        <div className="flex items-center space-x-2">
            <span className="font-mono text-sm">{value}</span>
            <button onClick={() => onCopy(value, label)} className="p-1 rounded text-light-secondary hover:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary">
                <CopyIcon />
            </button>
        </div>
    </div>
);


const ColorPicker: React.FC = () => {
    const [color, setColor] = useState<string>(getInitialColor());
    const [imageUrl, setImageUrl] = useState<string>('');
    const [imageUrlInput, setImageUrlInput] = useState<string>('');
    const [hoverColor, setHoverColor] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    useEffect(() => {
        localStorage.setItem('color-picker-color', color);
    }, [color]);

    const colorFormats = useMemo(() => {
        const [r, g, b] = hexToRgb(color);
        const [h, s, l] = hexToHsl(color);
        return {
            hex: color,
            rgb: `rgb(${r}, ${g}, ${b})`,
            hsl: `hsl(${h}, ${s}%, ${l}%)`
        };
    }, [color]);

    const drawImageOnCanvas = useCallback((src: string) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { willReadFrequently: true });
        if (!canvas || !ctx) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const maxWidth = canvas.parentElement?.clientWidth || 600;
            canvas.width = maxWidth;
            canvas.height = maxWidth / aspectRatio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.onerror = () => {
            addToast('Não foi possível carregar a imagem. Verifique o link ou se o site permite o compartilhamento (CORS).', 'error');
            setImageUrl('');
        };
    }, [addToast]);

    useEffect(() => {
        if (imageUrl) {
            drawImageOnCanvas(imageUrl);
        }
    }, [imageUrl, drawImageOnCanvas]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleUrlLoad = () => {
        if (imageUrlInput.trim()) {
            setImageUrl(imageUrlInput.trim());
        }
    };

    const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>, action: 'hover' | 'click') => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = pixel;
        const newHex = rgbToHex(r, g, b);

        if (action === 'hover') {
            setHoverColor(newHex);
        } else { // click
            setColor(newHex);
        }
    };

    const handleCopy = (value: string, format: string) => {
        copy(value);
        addToast(`${format} copiado: ${value}`, 'success');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
                <div className="w-full h-32 rounded-lg" style={{ backgroundColor: color }}></div>
                <div className="flex items-center justify-center space-x-4">
                    <label htmlFor="color-picker" className="font-semibold">Seletor:</label>
                    <input
                        id="color-picker"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-12 p-0 border-none rounded-md cursor-pointer bg-transparent"
                    />
                </div>
                <div className="space-y-2">
                    <ColorValue label="HEX" value={colorFormats.hex} onCopy={handleCopy} />
                    <ColorValue label="RGB" value={colorFormats.rgb} onCopy={handleCopy} />
                    <ColorValue label="HSL" value={colorFormats.hsl} onCopy={handleCopy} />
                </div>
            </div>
            <div className="md:col-span-2 space-y-4">
                 <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-3">
                    <p className="font-semibold text-center">Carregar uma imagem</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            placeholder="Cole o URL da imagem aqui"
                            className="flex-grow p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-1 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none"
                        />
                         <Button onClick={handleUrlLoad} variant="secondary" className="flex-shrink-0">Carregar URL</Button>
                    </div>
                    <div className="text-center">ou</div>
                    <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                        Escolher Arquivo do Computador
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                 </div>

                {imageUrl && (
                    <div className="relative">
                       <canvas
                            ref={canvasRef}
                            className="w-full h-auto rounded-lg cursor-crosshair"
                            onMouseMove={(e) => handleCanvasInteraction(e, 'hover')}
                            onClick={(e) => handleCanvasInteraction(e, 'click')}
                            onMouseLeave={() => setHoverColor(null)}
                       />
                       {hoverColor && (
                           <div className="absolute top-2 right-2 flex items-center p-2 bg-light-card dark:bg-dark-card rounded-md shadow-lg border border-light-secondary/20 dark:border-dark-secondary/20 pointer-events-none">
                               <div className="w-6 h-6 rounded-sm border-2 border-white" style={{ backgroundColor: hoverColor }}></div>
                               <span className="ml-2 font-mono text-sm">{hoverColor}</span>
                           </div>
                       )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColorPicker;
