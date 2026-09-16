
import React, { useState, useCallback } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/Button';
import { generateNicks, NickMethod } from '../utils/nickGenerator';

// --- Data ---
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

const nickMethods: { id: NickMethod; label: string }[] = [
    { id: 'aleatorio', label: 'Aleatório' },
    { id: 'nome', label: 'A partir do seu nome' },
    { id: 'nome_adjetivo', label: 'Nome + Adjetivo' },
];

const selectClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20';

const NickGenerator: React.FC<{onCopy: (text: string, msg: string) => void}> = ({ onCopy }) => {
    const [method, setMethod] = useState<NickMethod>('aleatorio');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [tamanho, setTamanho] = useState(6);
    const [quantidade, setQuantidade] = useState(5);
    const [nicks, setNicks] = useState<string[]>([]);

    const generateAll = useCallback(() => {
        setNicks(generateNicks({ method, nome, sobrenome, tamanho, quantidade }));
    }, [method, nome, sobrenome, tamanho, quantidade]);

    useState(generateAll);

    const usaNome = method !== 'aleatorio';

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="nick-method">Método</label>
                    <select id="nick-method" value={method} onChange={e => setMethod(e.target.value as NickMethod)} className={selectClass}>
                        {nickMethods.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="nick-tamanho">Tamanho</label>
                    <select id="nick-tamanho" value={tamanho} onChange={e => setTamanho(Number(e.target.value))} className={selectClass}>
                        {[4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} letras</option>)}
                    </select>
                </div>
            </div>

            {usaNome && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20" />
                    <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Sobrenome (opcional)" className="w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20" />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1" htmlFor="nick-quantidade">Quantidade</label>
                <select id="nick-quantidade" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} className={selectClass}>
                    {[3, 5, 10, 20].map(n => <option key={n} value={n}>{n} nicks</option>)}
                </select>
            </div>

            <div className="flex justify-center">
                <Button onClick={generateAll}>Gerar Nicks</Button>
            </div>

            {nicks.length > 0 && (
                <div className="space-y-2">
                    {nicks.map(n => (
                        <div key={n} className="flex items-center justify-between p-2 bg-light-bg dark:bg-dark-bg rounded-md">
                            <span className="font-mono">{n}</span>
                            <Button variant="secondary" onClick={() => onCopy(n, 'Nick copiado!')}>Copiar</Button>
                        </div>
                    ))}
                </div>
            )}
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
                        <Button variant="secondary" onClick={() => onCopy(convertText(style), 'Texto copiado!')}>Copiar</Button>
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
