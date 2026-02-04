
import React, { useState, useCallback, useMemo } from 'react';
import Button from '../components/Button';
import Slider from '../components/Slider';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';

const LOREM_IPSUM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus. Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque. Vivamus eget nibh. Etiam cursus leo vel metus. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit agna, endrerit sit amet, tincidunt ac, viverra sed, nulla. Donec porta diam eu massa. Quisque diam lorem, interdum vitae, dapibus ac, scelerisque vitae, pede. Donec eget tellus non erat lacinia fermentum. Donec in velit vel ipsum auctor pulvinar.';

const LoremIpsumGenerator: React.FC = () => {
    const [paragraphs, setParagraphs] = useState(3);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const generatedText = useMemo(() => {
        return Array(paragraphs).fill(LOREM_IPSUM_TEXT).join('\n\n');
    }, [paragraphs]);
    
    const handleCopy = () => {
        copy(generatedText);
        addToast('Texto copiado!', 'success');
    };

    return (
        <div className="space-y-6">
            <div className="max-w-md mx-auto">
                <Slider 
                    label="Número de Parágrafos"
                    min={1}
                    max={20}
                    value={paragraphs}
                    onChange={(e) => setParagraphs(parseInt(e.target.value, 10))}
                />
            </div>
            <textarea
                readOnly
                value={generatedText}
                className="w-full h-64 p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:outline-none"
            />
            <div className="text-center">
                <Button onClick={handleCopy}>
                    Copiar Texto
                </Button>
            </div>
        </div>
    );
};

export default LoremIpsumGenerator;
