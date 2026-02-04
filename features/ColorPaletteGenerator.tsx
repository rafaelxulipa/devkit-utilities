
import React, { useState, useMemo, useCallback } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { generatePalette, getTextColorForBackground } from '../utils/colorGenerator';

type Harmony = 'analogous' | 'monochromatic' | 'triade' | 'complementary' | 'square';

const harmonyOptions: { id: Harmony; label: string }[] = [
    { id: 'analogous', label: 'Análogo' },
    { id: 'monochromatic', label: 'Monocromático' },
    { id: 'triade', label: 'Tríade' },
    { id: 'complementary', label: 'Complementar' },
    { id: 'square', label: 'Quadrado' },
];

const ColorPaletteGenerator: React.FC = () => {
    const [baseColor, setBaseColor] = useState('#7aa2f7');
    const [harmony, setHarmony] = useState<Harmony>('analogous');
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const palette = useMemo(() => {
        return generatePalette(baseColor, harmony);
    }, [baseColor, harmony]);

    const handleCopy = useCallback((color: string) => {
        copy(color);
        addToast(`Cor ${color} copiada!`, 'success');
    }, [copy, addToast]);

    const ColorSwatch: React.FC<{ color: string }> = ({ color }) => {
        const textColor = getTextColorForBackground(color);
        return (
            <div
                onClick={() => handleCopy(color)}
                className="relative flex-1 h-32 md:h-48 rounded-lg cursor-pointer group flex items-end justify-center p-2 transition-transform transform hover:scale-105"
                style={{ backgroundColor: color }}
                title={`Copiar ${color}`}
            >
                <span 
                    className="font-mono text-sm font-semibold px-2 py-1 rounded bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity"
                    style={{ color: textColor }}
                >
                    {color}
                </span>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-4 p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
                <div className="flex items-center space-x-3">
                    <label htmlFor="color-picker" className="font-semibold">Cor Base:</label>
                    <input
                        id="color-picker"
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-light-card dark:bg-dark-card"
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {harmonyOptions.map(option => (
                        <button
                            key={option.id}
                            onClick={() => setHarmony(option.id)}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                                harmony === option.id
                                    ? 'bg-light-primary dark:bg-dark-primary text-white'
                                    : 'bg-light-secondary/20 dark:bg-dark-secondary/20 hover:bg-light-secondary/30 dark:hover:bg-dark-secondary/30'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                {palette.map((color, index) => (
                    <ColorSwatch key={`${color}-${index}`} color={color} />
                ))}
            </div>
        </div>
    );
};

export default ColorPaletteGenerator;
