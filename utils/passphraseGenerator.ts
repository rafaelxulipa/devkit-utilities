// --- Gerador de Senha Memorável (passphrase estilo Diceware) ---
// Lista de palavras comuns em português (sem acentos, para facilitar digitação em qualquer teclado).
const rawWordList = `
sol lua mar rio monte vale campo flor folha fruta pedra areia praia onda vento chuva nuvem
neve gelo fogo terra ar agua luz sombra noite dia manha tarde estrela planeta cometa
gato cao leao tigre urso lobo raposa cervo cavalo touro vaca porco ovelha cabra galinha pato
ganso peixe golfinho baleia tubarao polvo caranguejo aranha abelha formiga borboleta libelula
pomba coruja aguia falcao papagaio pinguim canguru elefante girafa zebra macaco coelho rato
esquilo ourico texugo castor lontra foca morsa jacare cobra lagarto tartaruga sapo
casa porta janela telhado parede escada quarto cozinha sala jardim muro portao chave fechadura
mesa cadeira sofa cama armario espelho quadro tapete cortina lampada vela livro caneta lapis
papel caderno mochila carteira relogio oculos chapeu luva bota sapato camisa calca vestido
casaco cinto anel colar pulseira brinco bolsa bicicleta carro onibus trem aviao
barco navio moto trilho estrada ponte tunel farol semaforo praca parque floresta deserto
ilha vulcao caverna gruta cascata lago lagoa oceano baia golfo continente pais cidade vila
aldeia bairro rua avenida esquina calcada cerca portal torre castelo palacio templo
igreja mesquita catedral museu teatro cinema biblioteca escola universidade hospital farmacia
mercado feira loja padaria acougue restaurante cafe bar hotel pousada fazenda celeiro moinho
pomar horta vinha trigo milho arroz feijao batata cenoura cebola alho tomate alface
pepino abobora melancia manga uva pera maca banana laranja limao abacaxi morango cereja
ameixa coco tamara figo amora framboesa mel leite queijo manteiga pao bolo biscoito doce
chocolate sorvete cha suco vinho cerveja sopa salada macarrao pizza
ouro prata bronze ferro cobre aco chumbo estanho diamante rubi esmeralda safira topazio
ametista cristal marfim couro seda algodao la linho veludo renda botao fio agulha tesoura
martelo prego parafuso serra machado picareta pa enxada rastelo balde escova vassoura
sabao esponja toalha lencol cobertor travesseiro almofada cesto caixa saco garrafa copo prato
talher garfo faca colher panela frigideira forno fogao geladeira microondas liquidificador
ventilador aquecedor televisao radio telefone computador teclado tela impressora camera
violao piano flauta tambor guitarra bateria trompete violino harpa
`;

const stripAccents = (s: string): string => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

export const passphraseWords: string[] = Array.from(
    new Set(rawWordList.split(/\s+/).filter(Boolean).map(w => stripAccents(w.toLowerCase())))
);

// crypto.getRandomValues com rejection sampling, para não ter viés de módulo.
const secureRandomInt = (maxExclusive: number): number => {
    const bytesNeeded = Math.ceil(Math.log2(maxExclusive) / 8) || 1;
    const maxValid = Math.floor(256 ** bytesNeeded / maxExclusive) * maxExclusive;
    let value: number;
    do {
        const bytes = crypto.getRandomValues(new Uint8Array(bytesNeeded));
        value = bytes.reduce((acc, b) => acc * 256 + b, 0);
    } while (value >= maxValid);
    return value % maxExclusive;
};

export interface PassphraseOptions {
    wordCount: number;
    separator: string;
    capitalize: boolean;
    includeNumber: boolean;
}

export const generatePassphrase = (options: PassphraseOptions): string => {
    const words = Array.from({ length: options.wordCount }, () => {
        const word = passphraseWords[secureRandomInt(passphraseWords.length)];
        return options.capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    });
    if (options.includeNumber) {
        words.push(String(secureRandomInt(100)).padStart(2, '0'));
    }
    return words.join(options.separator);
};

// Entropia estimada em bits: cada palavra contribui log2(tamanho do dicionário);
// o número final (00-99) contribui log2(100).
export const estimateEntropyBits = (wordCount: number, includeNumber: boolean): number => {
    const wordsEntropy = wordCount * Math.log2(passphraseWords.length);
    const numberEntropy = includeNumber ? Math.log2(100) : 0;
    return Math.round(wordsEntropy + numberEntropy);
};

export const getStrengthLabel = (bits: number): { label: string; className: string } => {
    if (bits < 40) return { label: 'Fraca', className: 'text-red-600 dark:text-red-400' };
    if (bits < 60) return { label: 'Razoável', className: 'text-yellow-600 dark:text-yellow-400' };
    if (bits < 80) return { label: 'Forte', className: 'text-green-600 dark:text-green-400' };
    return { label: 'Muito forte', className: 'text-green-600 dark:text-green-400' };
};
