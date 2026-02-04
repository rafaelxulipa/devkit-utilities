
import type React from 'react';

export enum Category {
  TEXT = "Texto e Escrita",
  GENERATORS = "Geradores",
  DOCUMENTS = "Documentos e Validações",
  DEV = "Desenvolvedor",
  MOCK_DATA = "Dados Fictícios",
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  path: string;
  category: Category;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  tags: string[];
}