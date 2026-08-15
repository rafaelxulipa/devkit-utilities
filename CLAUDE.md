# CLAUDE.md

Guia para o Claude Code (ou qualquer agente) trabalhar neste repositório.

## Visão geral

**DevKit Utilidades** é uma SPA em português (pt-BR) que reúne ~18 utilitários do dia a dia
("canivete suíço digital"), com foco em ferramentas usadas por desenvolvedores e profissionais
brasileiros (geradores/validadores de CPF, CNPJ, RG, placas etc.). Stack: React 18 + TypeScript +
Vite 6 + Tailwind CSS + `react-router-dom` (HashRouter). **100% client-side** — não há backend,
API própria nem banco de dados; todo gerador/validador roda no navegador. Deploy como SPA estática
na Vercel (`vercel.json` faz rewrite de tudo para `index.html`). Também é um PWA instalável básico
(`public/manifest.json` + `public/sw.js`).

## Arquitetura

- `constants.tsx` — fonte única de verdade: array `ALL_TOOLS` (objetos `Tool`: id, title,
  description, path, category, icon, component, tags) e `CATEGORIES`. Adicionar uma ferramenta nova
  ao site é, na prática, criar o componente em `features/` e adicionar uma entrada aqui.
- `types.ts` — enum `Category` (6 categorias) e interface `Tool`.
- `App.tsx` — `HashRouter` com 4 rotas: `/`, `/politica-de-privacidade`, `/category/:categoryPath`,
  e um catch-all `/:toolPath` que resolve a ferramenta procurando em `ALL_TOOLS`.
- `features/*.tsx` — um componente por ferramenta (a UI). Padrão comum: `useState` local para
  input/output, checkbox "Incluir pontuação" quando o dado tem máscara (CPF, CNPJ, PIS...), botão
  de copiar via `useCopyToClipboard`, feedback via `useToast`.
- `utils/*.ts` — lógica pura, sem dependência de React. Toda regra de geração/validação/formatação
  deve morar aqui, não dentro do componente.
- `pages/` — `HomePage` (busca + favoritos + grade completa), `CategoryPage`, `PrivacyPolicyPage`.
- `contexts/` — `ThemeProvider` (claro/escuro, `localStorage['theme']`, classe `.dark` na `<html>`),
  `FavoritesProvider` (`localStorage['favorite_tools']`), `ToastProvider`, `AdConsentProvider`
  (só carrega o script do AdSense depois que o usuário aceita o banner de cookies).

## Convenções

- Só Tailwind; o único CSS "solto" é `index.css` (diretivas do Tailwind). Use os tokens de cor
  customizados `dark.*` / `light.*` definidos em `tailwind.config.js` (paleta estilo Tokyo Night),
  não as cores padrão do Tailwind, para manter a identidade visual.
- Toda a UI é em português do Brasil.
- Documentos com máscara canônica (CPF, CNPJ, CNPJ Alfanumérico, PIS...) sempre expõem o toggle
  "Incluir pontuação".
- Geradores e validadores de documentos brasileiros vivem aos pares em
  `utils/documentGenerators.ts` / `utils/documentValidators.ts`. Ao adicionar um novo tipo de
  documento, crie os dois (gerador + validador) e registre a opção nos dois lugares:
  `DocumentGenerator.tsx` (`documentOptions` + `switch`) e `DocumentValidator.tsx` (idem). Veja o
  CNPJ Alfanumérico (IN RFB nº 2.229/2024) como referência de um par recém-adicionado.

## Pegadinhas / coisas para saber antes de mexer

- `utils/passwordGenerator.ts` usa `Math.random()`, não `crypto.getRandomValues` — ou seja, **não
  é criptograficamente seguro**, apesar do nome "Gerador de Senha Segura". Vale corrigir se for
  pedido para reforçar segurança.
- `vite.config.ts` ainda injeta `process.env.API_KEY` / `GEMINI_API_KEY` a partir de `.env.local`.
  Isso é resquício do scaffold original (Google AI Studio) — nada no app hoje chama alguma API de
  IA. Não assuma que existe integração com Gemini.
- `features/CodeFormatter.tsx` importa o Prettier e os plugins dinamicamente via `esm.sh` em
  runtime (não é bundlado) — precisa de rede e falha silenciosamente offline.
- `features/ImagePlaceholderGenerator.tsx` depende do serviço externo `picsum.photos`.
- O cache do service worker tem nome `devkit-v2` em `public/sw.js` — mude essa string sempre que
  alterar os assets pré-cacheados (`/`, `/index.html`, `/index.css`, `/favicon.svg`), senão
  usuários recorrentes continuam recebendo a versão antiga.
- O `HashRouter` é proposital (URLs tipo `/#/gerador-documentos`) — não troque para
  `BrowserRouter` sem revisar `vercel.json` e o hosting estático.
- O AdSense (`ca-pub-0079702856690089`) só carrega depois que o usuário aceita o banner de cookies
  (`AdConsentContext` + `CookieBanner`). Não adicione scripts de tracking que pulem esse gate de
  consentimento.

## Comandos

- `npm run dev` — servidor de desenvolvimento Vite (porta 3000 por padrão)
- `npm run build` — build de produção
- `npm run preview` — preview do build de produção
- `npx tsc --noEmit` — checagem de tipos (não há suíte de testes automatizados neste repo)
