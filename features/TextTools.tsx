
import React, { useState, useCallback } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/Button';

// --- Data ---
const adjectives = ['Rápido', 'Brilhante', 'Sombrio', 'Misterioso', 'Silencioso', 'Épico', 'Dourado', 'Gélido', 'Letal', 'Oculto'];
const nouns = ['Lobo', 'Corvo', 'Dragão', 'Fantasma', 'Caçador', 'Mago', 'Guerreiro', 'Trovão', 'Espectro', 'Andarilho'];
const symbols = ['★', '☆', '✦', '✧', '♦', '♢', '♠', '♤', '♥', '♡', '♣', '♧', '✖', '✔', '☠', '☣', '☢', '☯', '☮', '♆', '⚡', '❖', '※'];
const commonSymbols = "© ® ™ ° ² ³ € ¥ £ $ ¢ ✓ ™ ℠ № ℗ Ω µ ∆ ∑ π ∞ ≈ ≠ ≤ ≥ ± ‰ ← → ↑ ↓ ↔ ↵";
const fontMappings: Record<string, Record<string, string>> = {
  'Bold': {'a':'𝐚','b':'𝐛','c':'𝐜','d':'𝐝','e':'𝐞','f':'𝐟','g':'𝐠','h':'𝐡','i':'𝐢','j':'𝐣','k':'𝐤','l':'𝐥','m':'𝐦','n':'𝐧','o':'𝐨','p':'𝐩','q':'𝐪','r':'𝐫','s':'𝐬','t':'𝐭','u':'𝐮','v':'𝐯','w':'𝐰','x':'𝐱','y':'𝐲','z':'𝐳','A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈','J':'𝐉','K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑','S':'𝐒','T':'𝐓','U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙'},
  'Italic': {'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫','k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵','u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺','z':'𝘻','A':'𝘈','B':'𝘉','C':'𝘊','D':'𝘋','E':'𝘌','F':'𝘍','G':'𝘎','H':'𝘏','I':'𝘐','J':'𝘑','K':'𝘒','L':'𝘓','M':'𝘔','N':'𝘕','O':'𝘖','P':'𝘗','Q':'𝘘','R':'𝘙','S':'𝘚','T':'𝘛','U':'𝘜','V':'𝘝','W':'𝘞','X':'𝘟','Y':'𝘠','Z':'𝘡'},
  'Circled': {'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ','k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ','t':'ⓣ','u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ','A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ','K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ','T':'Ⓣ','U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ'},
};

// --- Sub-components ---
const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="space-y-4 p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
        <h3 className="text-xl font-bold text-center text-light-primary dark:text-dark-primary">{title}</h3>
        {children}
    </div>
);

const NickGenerator: React.FC<{onCopy: (text: string, msg: string) => void}> = ({ onCopy }) => {
    const [nick, setNick] = useState('');
    const generateNick = useCallback(() => {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        const num = Math.floor(Math.random() * 100);
        const newNick = `${adj}${noun}${sym}${num}`;
        setNick(newNick);
    }, []);

    useState(generateNick);

    return (
        <div className="space-y-4">
            <input type="text" readOnly value={nick} className="w-full p-3 text-center font-mono rounded-md bg-light-bg dark:bg-dark-bg" />
            <div className="flex gap-4 justify-center">
                <Button onClick={generateNick}>Gerar Novo</Button>
                <Button onClick={() => onCopy(nick, 'Nick copiado!')} variant="secondary">Copiar</Button>
            </div>
        </div>
    );
};

const FancyTextGenerator: React.FC<{onCopy: (text: string, msg: string) => void}> = ({ onCopy }) => {
    const [text, setText] = useState('Texto de Exemplo');
    
    const convertText = (style: string) => {
        const mapping = fontMappings[style];
        return text.split('').map(char => mapping[char] || char).join('');
    };

    return (
        <div className="space-y-4">
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Digite seu texto aqui" className="w-full p-3 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20" />
            <div className="space-y-3">
                {Object.keys(fontMappings).map(style => (
                    <div key={style} className="flex items-center justify-between p-2 bg-light-bg dark:bg-dark-bg rounded-md">
                        <span className="font-semibold">{style}</span>
                        <span className="truncate flex-grow mx-4">{convertText(style)}</span>
                        <Button size="sm" variant="secondary" onClick={() => onCopy(convertText(style), 'Texto copiado!')}>Copiar</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SymbolCopier: React.FC<{onCopy: (text: string, msg: string) => void}> = ({ onCopy }) => (
    <div className="flex flex-wrap gap-2 justify-center bg-light-bg dark:bg-dark-bg p-4 rounded-md">
        {commonSymbols.split(' ').map(symbol => (
            <button key={symbol} onClick={() => onCopy(symbol, `Símbolo ${symbol} copiado!`)} className="p-2 w-10 h-10 text-xl rounded-md hover:bg-light-secondary/20 dark:hover:bg-dark-secondary/20 transition-colors">
                {symbol}
            </button>
        ))}
    </div>
);


// --- Main Component ---
const TextTools: React.FC = () => {
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const handleCopy = (text: string, message: string) => {
        copy(text);
        addToast(message, 'success');
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <Section title="Gerador de Nicks">
                <NickGenerator onCopy={handleCopy} />
            </Section>
            <Section title="Gerador de Letras Diferentes">
                <FancyTextGenerator onCopy={handleCopy} />
            </Section>
            <Section title="Símbolos para Copiar">
                <SymbolCopier onCopy={handleCopy} />
            </Section>
        </div>
    );
};

export default TextTools;
