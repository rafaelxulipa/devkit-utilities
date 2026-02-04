
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
    id: 'document-generator',
    title: 'Gerador de CPF/CNPJ',
    description: 'Gere números de CPF e CNPJ válidos para testes e desenvolvimento.',
    path: 'gerador-cpf-cnpj',
    category: Category.DOCUMENTS,
    icon: DocumentIcon,
    component: DocumentGenerator,
    tags: ['cpf', 'cnpj', 'documento', 'gerador', 'validação', 'testes'],
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
    id: 'document-validator',
    title: 'Validador de CPF/CNPJ',
    description: 'Verifique se um número de CPF ou CNPJ é válido matematicamente.',
    path: 'validador-cpf-cnpj',
    category: Category.DOCUMENTS,
    icon: ValidationIcon,
    component: DocumentValidator,
    tags: ['cpf', 'cnpj', 'documento', 'validador', 'receita federal'],
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
    name: Category.DOCUMENTS, 
    icon: DocumentIcon,
    path: 'documentos-e-validacoes',
    description: 'Gere e valide documentos brasileiros para seus testes.'
  },
  { 
    name: Category.DEV, 
    icon: DevIcon,
    path: 'desenvolvedor',
    description: 'Utilidades essenciais para o dia a dia do desenvolvedor.'
  },
];
