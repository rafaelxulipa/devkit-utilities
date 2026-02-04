
import React from 'react';
import type { Tool } from './types';
import { Category } from './types';
import WordCounter from './features/WordCounter';
import PasswordGenerator from './features/PasswordGenerator';
import DocumentGenerator from './features/DocumentGenerator';
import UuidGenerator from './features/UuidGenerator';
import DocumentValidator from './features/DocumentValidator';
import ColorPaletteGenerator from './features/ColorPaletteGenerator';
import ColorPicker from './features/ColorPicker';
import PersonGenerator from './features/PersonGenerator';
import CompanyGenerator from './features/CompanyGenerator';
import VehicleGenerator from './features/VehicleGenerator';
import FinancialGenerator from './features/FinancialGenerator';
import LoremIpsumGenerator from './features/LoremIpsumGenerator';
import TextTools from './features/TextTools';
import NumberGenerator from './features/NumberGenerator';
import ImagePlaceholderGenerator from './features/ImagePlaceholderGenerator';
import SuperTextTool from './features/SuperTextTool';
import NumberToWords from './features/NumberToWords';
import CodeFormatter from './features/CodeFormatter';
import DateCalculator from './features/DateCalculator';

const TextIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m-4 4h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LockIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const DocumentIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const DevIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const ValidationIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ColorSwatchIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const EyedropperIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5l5 5L17 12l-1.5-1.5L12 14l-3.5-3.5L7 11.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 5.5a2.12 2.12 0 010 3l-11 11a2.12 2.12 0 01-3 0 2.12 2.12 0 010-3l11-11a2.12 2.12 0 013 0z" />
    </svg>
);

const UsersIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 12.75a5.995 5.995 0 01-3 5.197z" />
    </svg>
);
const BuildingOfficeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-1 4h1m6-4h1m-1 4h1m-1-4h1m-1 4h1" />
    </svg>
);
const TruckIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17H6V6h11v5l4 4v2h-3zM6 17H3V3h12v10h2" />
    </svg>
);
const CreditCardIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);
const HashtagIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
);
const DocumentTextIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const SparklesIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-15l1.06 1.06M17 7l1.06-1.06M7 17l-1.06 1.06M17 17l1.06 1.06m-4.47 1.94L12 17.5l-1.59 1.5-1.06-1.06-1.5-1.59 1.06-1.06L12 15.41l1.59-1.5 1.06 1.06 1.5 1.59-1.06 1.06-1.59 1.5zM12 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" />
    </svg>
);
const PhotoIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const SuperTextToolIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const NumberToWordsIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.252v11.496M16.5 12.252H7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 19.752H7c-1.657 0-3-1.343-3-3V7.252c0-1.657 1.343-3 3-3h10c1.657 0 3 1.343 3 3v9.5c0 1.657-1.343 3-3 3z" />
    </svg>
);

const CodeFormatterIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h3m-3 5h3m-3 5h3" />
    </svg>
);

const CalendarIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


export const ALL_TOOLS: Tool[] = [
  {
    id: 'word-counter',
    title: 'Contador de Palavras e Caracteres',
    description: 'Conte palavras, caracteres, sentenças e parágrafos em seu texto.',
    path: 'contador-palavras-caracteres',
    category: Category.TEXT,
    icon: TextIcon,
    component: WordCounter,
    tags: ['texto', 'contador', 'palavras', 'caracteres', 'word counter'],
  },
  {
    id: 'super-text-tool',
    title: 'Super Ferramenta de Texto',
    description: 'Ordene, inverta, converta maiúsculas/minúsculas, remova acentos e muito mais.',
    path: 'super-ferramenta-texto',
    category: Category.TEXT,
    icon: SuperTextToolIcon,
    component: SuperTextTool,
    tags: ['texto', 'formatar', 'ordenar', 'converter', 'remover', 'acentos', 'html', 'corretor'],
  },
  {
    id: 'number-to-words',
    title: 'Número por Extenso',
    description: 'Converta números para sua representação por extenso em português.',
    path: 'numero-por-extenso',
    category: Category.TEXT,
    icon: NumberToWordsIcon,
    component: NumberToWords,
    tags: ['número', 'extenso', 'escrever', 'converter', 'texto'],
  },
  {
    id: 'text-tools',
    title: 'Letras e Símbolos Personalizados',
    description: 'Gerador de nicks, letras diferentes, e uma coleção de símbolos para copiar.',
    path: 'ferramentas-texto',
    category: Category.TEXT,
    icon: SparklesIcon,
    component: TextTools,
    tags: ['nicks', 'fontes', 'letras', 'símbolos', 'copiar', 'estilo'],
  },
  {
    id: 'password-generator',
    title: 'Gerador de Senha Segura',
    description: 'Crie senhas fortes e seguras com opções customizáveis.',
    path: 'gerador-senha',
    category: Category.GENERATORS,
    icon: LockIcon,
    component: PasswordGenerator,
    tags: ['senha', 'password', 'gerador', 'segurança', 'generator'],
  },
  {
    id: 'number-generator',
    title: 'Sorteador de Números',
    description: 'Sorteie números aleatórios dentro de um intervalo ou a partir de uma lista.',
    path: 'sorteador-numeros',
    category: Category.GENERATORS,
    icon: HashtagIcon,
    component: NumberGenerator,
    tags: ['números', 'aleatório', 'sorteio', 'sorteador', 'random'],
  },
   {
    id: 'lorem-ipsum-generator',
    title: 'Gerador de Lorem Ipsum',
    description: 'Crie textos de preenchimento (placeholder) de forma rápida e customizada.',
    path: 'gerador-lorem-ipsum',
    category: Category.GENERATORS,
    icon: DocumentTextIcon,
    component: LoremIpsumGenerator,
    tags: ['lorem ipsum', 'texto', 'placeholder', 'design', 'layout'],
  },
  {
    id: 'date-calculator',
    title: 'Calculadora de Datas',
    description: 'Calcule a diferença de dias entre datas, some ou subtraia dias.',
    path: 'calculadora-datas',
    category: Category.DATES,
    icon: CalendarIcon,
    component: DateCalculator,
    tags: ['data', 'hora', 'dias', 'somar', 'subtrair', 'contador', 'calculadora'],
  },
  {
    id: 'document-generator',
    title: 'Gerador de Documentos',
    description: 'Gere CPF, CNPJ, RG, CNH, Título de Eleitor e PIS/PASEP válidos.',
    path: 'gerador-documentos',
    category: Category.DOCUMENTS,
    icon: DocumentIcon,
    component: DocumentGenerator,
    tags: ['cpf', 'cnpj', 'rg', 'cnh', 'título de eleitor', 'pis', 'pasep', 'documento', 'gerador'],
  },
   {
    id: 'document-validator',
    title: 'Validador de Documentos',
    description: 'Valide CPF, CNPJ, CNH, PIS, RENAVAM, Título de Eleitor, Cartão de Crédito e mais.',
    path: 'validador-documentos',
    category: Category.DOCUMENTS,
    icon: ValidationIcon,
    component: DocumentValidator,
    tags: ['cpf', 'cnpj', 'cnh', 'pis', 'renavam', 'título', 'cartão', 'ie', 'rg', 'certidão', 'validador'],
  },
  {
    id: 'person-generator',
    title: 'Gerador de Pessoas',
    description: 'Crie dados completos de pessoas fictícias, incluindo nome, documentos e endereço.',
    path: 'gerador-pessoas',
    category: Category.MOCK_DATA,
    icon: UsersIcon,
    component: PersonGenerator,
    tags: ['pessoas', 'dados', 'fictício', 'mock', 'teste', 'nome', 'gerador'],
  },
  {
    id: 'company-generator',
    title: 'Gerador de Empresas',
    description: 'Crie dados de empresas fictícias, incluindo nome, CNPJ e Inscrição Estadual.',
    path: 'gerador-empresas',
    category: Category.MOCK_DATA,
    icon: BuildingOfficeIcon,
    component: CompanyGenerator,
    tags: ['empresas', 'mock', 'teste', 'cnpj', 'inscrição estadual', 'gerador'],
  },
   {
    id: 'vehicle-generator',
    title: 'Gerador de Veículos',
    description: 'Gere dados de veículos, incluindo modelo, placa e RENAVAM.',
    path: 'gerador-veiculos',
    category: Category.MOCK_DATA,
    icon: TruckIcon,
    component: VehicleGenerator,
    tags: ['veículo', 'carro', 'placa', 'renavam', 'mock', 'gerador'],
  },
  {
    id: 'financial-generator',
    title: 'Gerador de Dados Financeiros',
    description: 'Crie números de cartão de crédito e conta bancária para testes.',
    path: 'gerador-dados-financeiros',
    category: Category.MOCK_DATA,
    icon: CreditCardIcon,
    component: FinancialGenerator,
    tags: ['cartão de crédito', 'conta bancária', 'banco', 'financeiro', 'mock'],
  },
  {
    id: 'code-formatter',
    title: 'Formatador de Código',
    description: 'Embeleze e formate código (JSON, JS, HTML, CSS) e visualize JSON em árvore.',
    path: 'formatador-codigo',
    category: Category.DEV,
    icon: CodeFormatterIcon,
    component: CodeFormatter,
    tags: ['json', 'javascript', 'html', 'css', 'formatar', 'beautify', 'viewer', 'dev'],
  },
  {
    id: 'uuid-generator',
    title: 'Gerador de UUID',
    description: 'Gere identificadores únicos universalmente (UUID v4).',
    path: 'gerador-uuid',
    category: Category.DEV,
    icon: DevIcon,
    component: UuidGenerator,
    tags: ['uuid', 'guid', 'dev', 'desenvolvedor', 'identificador'],
  },
  {
    id: 'color-palette-generator',
    title: 'Gerador de Paleta de Cores',
    description: 'Crie harmonias de cores: análogas, monocromáticas, tríades e mais.',
    path: 'gerador-paleta-cores',
    category: Category.DEV,
    icon: ColorSwatchIcon,
    component: ColorPaletteGenerator,
    tags: ['cores', 'paleta', 'design', 'css', 'frontend', 'color', 'palette'],
  },
  {
    id: 'color-picker',
    title: 'Seletor de Cores (Conta-gotas)',
    description: 'Capture cores de imagens, ou selecione manualmente em vários formatos.',
    path: 'seletor-cores',
    category: Category.DEV,
    icon: EyedropperIcon,
    component: ColorPicker,
    tags: ['cor', 'picker', 'seletor', 'hex', 'rgb', 'hsl', 'imagem', 'eyedropper'],
  },
   {
    id: 'image-placeholder-generator',
    title: 'Gerador de Imagem Placeholder',
    description: 'Crie URLs de imagens de preenchimento com tamanho personalizado.',
    path: 'gerador-imagem-placeholder',
    category: Category.DEV,
    icon: PhotoIcon,
    component: ImagePlaceholderGenerator,
    tags: ['imagem', 'placeholder', 'dev', 'frontend', 'layout', 'image'],
  },
];

export const CATEGORIES = [
  { 
    name: Category.TEXT, 
    icon: TextIcon, 
    path: 'texto-e-escrita',
    description: 'Ferramentas para analisar, contar e manipular texto.'
  },
  { 
    name: Category.GENERATORS, 
    icon: LockIcon,
    path: 'geradores',
    description: 'Crie senhas, documentos e outros dados de forma rápida.'
  },
  { 
    name: Category.DATES, 
    icon: CalendarIcon,
    path: 'datas-e-horas',
    description: 'Calcule durações, adicione ou subtraia dias de datas.'
  },
  { 
    name: Category.DOCUMENTS, 
    icon: DocumentIcon,
    path: 'documentos-e-validacoes',
    description: 'Gere e valide documentos brasileiros para seus testes.'
  },
   { 
    name: Category.MOCK_DATA, 
    icon: UsersIcon,
    path: 'dados-ficticios',
    description: 'Crie dados complexos para preencher suas aplicações.'
  },
  { 
    name: Category.DEV, 
    icon: DevIcon,
    path: 'desenvolvedor',
    description: 'Utilidades essenciais para o dia a dia do desenvolvedor.'
  },
];