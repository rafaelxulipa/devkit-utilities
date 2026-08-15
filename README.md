
<div align="center">
  <h1 align="center">
    DevKit Utilidades
  </h1>
  <p align="center">
    <strong>Seu canivete suíço digital para tarefas do dia a dia.</strong>
  </p>
  <p align="center">
    Uma plataforma web que reúne ferramentas e utilitários para desenvolvedores, estudantes e profissionais, com foco em simplicidade, performance e um design moderno.
  </p>
  
  <p align="center">
    <a href="https://github.com/rafaelxulipa/devkit-utilities/stargazers">
      <img src="https://img.shields.io/github/stars/rafaelxulipa/devkit-utilities?style=for-the-badge&logo=github&color=7aa2f7&logoColor=white" alt="Stars">
    </a>
    <a href="https://github.com/rafaelxulipa/devkit-utilities/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/rafaelxulipa/devkit-utilities?style=for-the-badge&color=bb9af7" alt="License">
    </a>
    <img src="https://img.shields.io/github/last-commit/rafaelxulipa/devkit-utilities?style=for-the-badge&color=c0caf5&logo=git" alt="Last Commit">
    <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-informational?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  </p>
</div>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-como-contribuir">Contribuir</a> •
  <a href="#-licença">Licença</a>
</p>

<!-- Adicione um screenshot ou GIF da sua aplicação aqui -->
<div align="center">
  <img src="https://raw.githubusercontent.com/rafaelxulipa/devkit-utilities/main/screenshot.png" alt="Screenshot da aplicação DevKit Utilidades" width="800px">
</div>

---

## 🚀 Sobre o Projeto

O **DevKit Utilidades** foi criado para ser uma central de ferramentas práticas e de fácil acesso,
eliminando a necessidade de procurar por diversas soluções em sites diferentes. É uma aplicação
**100% client-side**: todos os geradores, validadores e formatadores rodam inteiramente no seu
navegador — nenhum dado que você digita é enviado a um servidor. O projeto é construído com
React + TypeScript, empacotado com Vite e estilizado com Tailwind CSS, e funciona também como um
**PWA instalável** (com service worker e suporte offline básico para o app shell).

## ✨ Funcionalidades

O projeto conta com **18 ferramentas**, organizadas em 6 categorias, além de recursos transversais
como busca, favoritos e tema claro/escuro.

### 📝 Texto e Escrita
- **Contador de Palavras e Caracteres** — conta palavras, caracteres, sentenças e parágrafos.
- **Super Ferramenta de Texto** — 9 utilitários num só lugar: maiúsculas/minúsculas/title case,
  ordenar linhas, inverter texto, remover acentos, contar ocorrências, gerenciar quebras de linha,
  dividir texto por delimitador, converter para HTML e corretor ortográfico (via `spellcheck`
  nativo do navegador).
- **Número por Extenso** — converte números para sua escrita por extenso em português (até
  quatrilhões, com tratamento de negativos e casos como "cem" vs. "cento").
- **Letras e Símbolos Personalizados** — gerador de nicks, conversor para letras estilizadas
  (negrito, itálico, círculo — via tabela Unicode) e uma coleção de símbolos prontos para copiar.

### 🔧 Geradores
- **Gerador de Senha Segura** — comprimento ajustável (8–64) e opções de maiúsculas, números e
  símbolos.
- **Sorteador de Números** — sorteia números aleatórios em um intervalo, com ou sem repetição, e
  mantém histórico dos últimos sorteios.
- **Gerador de Lorem Ipsum** — gera parágrafos de texto de preenchimento com quantidade ajustável.
- **Gerador de UUID** — gera UUID v4 usando `crypto.randomUUID()` (com fallback para navegadores
  antigos).
- **Gerador de Imagem Placeholder** — monta URLs de imagens de preenchimento (via picsum.photos)
  com largura e altura customizadas.

### 📅 Datas e Horas
- **Calculadora de Datas** — diferença entre duas datas, somar ou subtrair dias de uma data.

### 📄 Documentos e Validações
- **Gerador de Documentos** — CPF, CNPJ, **CNPJ Alfanumérico** (novo formato da Receita Federal,
  IN RFB nº 2.229/2024, com letras A-Z e dígitos verificadores calculados via módulo 11 sobre
  valores ASCII), RG, CNH, Título de Eleitor e PIS/PASEP — todos com dígitos verificadores válidos.
- **Validador de Documentos** — valida CPF, CNPJ, CNPJ Alfanumérico, CNH, PIS/PASEP, RENAVAM,
  Título de Eleitor, Cartão de Crédito (Luhn), Inscrição Estadual (SP), RG (SP) e Certidão Civil.

### 🎭 Dados Fictícios
- **Gerador de Pessoas** — nome, CPF e RG fictícios e válidos.
- **Gerador de Empresas** — nome, CNPJ e Inscrição Estadual fictícios.
- **Gerador de Veículos** — placa no padrão Mercosul e RENAVAM.
- **Gerador de Dados Financeiros** — número de cartão de crédito (válido por Luhn) e conta
  bancária fictícia.

### 💻 Desenvolvedor
- **Formatador de Código** — formata JSON, JavaScript, HTML e CSS (via Prettier carregado sob
  demanda) e mostra o JSON também em um visualizador de árvore navegável.
- **Gerador de Paleta de Cores** — harmonias análoga, monocromática, tríade, complementar e
  quadrada a partir de uma cor base.
- **Seletor de Cores (Conta-gotas)** — captura cor de qualquer ponto de uma imagem (upload ou URL)
  ou escolhe manualmente, exportando em HEX, RGB e HSL.

### 💡 Recursos Transversais
- Tema claro e escuro, com detecção da preferência do sistema.
- Sistema de Favoritos (persistido no navegador).
- Busca inteligente por título, descrição e tags, direto na home.
- Design totalmente responsivo.
- Notificações (toasts) para feedback de ações como copiar.
- PWA instalável, com service worker para cache do app shell.
- Consentimento de cookies/anúncios: o script do Google AdSense só é carregado depois que o
  usuário aceita o banner.

## 🛠️ Tecnologias

- [**React 18**](https://react.dev/) — biblioteca para construir a interface.
- [**TypeScript**](https://www.typescriptlang.org/) — tipagem estática.
- [**Vite 6**](https://vitejs.dev/) — build tool e servidor de desenvolvimento.
- [**Tailwind CSS**](https://tailwindcss.com/) — estilização, com paleta de cores customizada.
- [**React Router DOM**](https://reactrouter.com/) (`HashRouter`) — roteamento client-side.
- **Service Worker + Web App Manifest** — suporte a instalação como PWA.

## 📁 Estrutura do Projeto

```
devkit-utilities/
├── App.tsx                # Rotas (HashRouter)
├── constants.tsx          # Catálogo de ferramentas (ALL_TOOLS) e categorias
├── types.ts                # Tipos Tool / Category
├── features/                # Um componente de UI por ferramenta
├── utils/                   # Lógica pura (geradores, validadores, formatadores)
├── pages/                   # HomePage, CategoryPage, PrivacyPolicyPage
├── contexts/                 # Theme, Favorites, Toast, AdConsent
├── components/               # Componentes de UI reutilizáveis (Button, Card, Header...)
├── hooks/                    # useTheme, useCopyToClipboard
└── public/                   # manifest.json, sw.js, favicon
```

## 🏁 Como Executar

**Pré-requisitos:** Node.js 18+.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/rafaelxulipa/devkit-utilities.git
    cd devkit-utilities
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:3000` (com hot-reload).

**Outros scripts disponíveis:**
```bash
npm run build     # build de produção (pasta dist/)
npm run preview   # serve o build de produção localmente
```

O projeto está pronto para deploy como SPA estática (ex: Vercel — veja `vercel.json`).

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Se você tem alguma ideia para uma nova ferramenta ou encontrou um bug, sinta-se à vontade para colaborar.

**Para contribuir:**

1.  **Faça um Fork** do projeto.
2.  Crie uma nova branch com suas modificações: `git checkout -b feature/NovaFerramenta`
3.  Salve suas alterações e faça um commit com uma mensagem descritiva: `git commit -m "feat: Adiciona nova ferramenta X"`
4.  Envie suas alterações para o seu fork: `git push origin feature/NovaFerramenta`
5.  Abra um **Pull Request** no repositório original.

Se preferir, abra uma **Issue** para relatar um bug ou sugerir uma nova funcionalidade.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<div align="center">
  Feito com ❤️ por Otávio Rafael, da Orlam Tech
</div>
