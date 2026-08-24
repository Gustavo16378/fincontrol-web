# FinControl — Web

Front-end do **FinControl**, sistema de controle de finanças pessoais com metas e módulo fiscal
brasileiro (MEI e ME). Interface inteiramente em português do Brasil.

Esta é a **Fase 1 — Fundação**: shell, temas, autenticação e navegação completos. Dashboard,
gráficos e CRUDs chegam nas próximas fases.

---

## Stack

| Peça         | Escolha                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| Framework    | Angular 21 (standalone components, sem NgModules, zoneless)              |
| Linguagem    | TypeScript estrito (`strict`, `noUnusedLocals`, `strictTemplates`)       |
| Formulários  | Reactive Forms em 100% dos formulários                                   |
| Rotas        | Lazy loading por feature (`loadChildren` / `loadComponent`)              |
| HTTP         | `provideHttpClient` + interceptors funcionais (JWT e tratamento de erro) |
| Estilo       | SCSS puro com CSS custom properties — **sem biblioteca de UI**           |
| Overlays     | Angular CDK Overlay (só comportamento, sem componentes visuais prontos)  |
| Formatação   | Prettier                                                                 |
| Testes       | Vitest via `@angular/build:unit-test`                                    |

> **Por que Angular 21 e não 22?** O Angular 22 exige Node `^22.22.3 || ^24.15.0 || >=26`.
> Se você atualizar o Node, `ng update` para a 22 é direto — nada aqui depende de API removida.

---

## Rodando localmente

Requer **Node 20.19+, 22.12+ ou 24+** e npm.

```bash
npm install
npm start          # http://localhost:4200
```

O `npm start` já sobe com `proxy.conf.json`, que encaminha tudo que começa com `/api` para
`http://localhost:8080` (o `fincontrol-api`) **removendo o prefixo `/api`**:

```
front:   GET /api/usuarios/me
backend: GET http://localhost:8080/usuarios/me
```

Se um dia a API passar a servir sob `/api`, basta apagar o bloco `pathRewrite` do
`proxy.conf.json`.

Sem a API no ar, o app sobe normalmente: as telas de login e cadastro exibem o erro de rede
inline, exatamente como fariam em produção.

### Scripts

| Comando                | O que faz                                                            |
| ---------------------- | -------------------------------------------------------------------- |
| `npm start`            | Dev server com proxy para a API local                                 |
| `npm run build`        | Build de produção (aplica `API_URL` antes de compilar)                |
| `npm test`             | Testes unitários (`-- --no-watch` para rodada única)                  |
| `npm run lint`         | Checagem de formatação com Prettier                                   |
| `npm run format`       | Aplica a formatação                                                   |
| `npm run gerar:imagens`| Regera `og-image.png` e os ícones do `public/` a partir de HTML       |

---

## Estrutura de pastas

```
src/
├── app/
│   ├── core/                 # o que existe uma vez só na aplicação
│   │   ├── guards/           # authGuard, convidadoGuard
│   │   ├── interceptors/     # auth (Bearer) e erro (401, mensagens)
│   │   ├── models/           # DTOs espelhando a API
│   │   ├── services/         # AuthService, ServicoApi, ServicoTema, ...
│   │   ├── utils/            # formatação e validadores
│   │   └── estrategia-titulo.ts
│   ├── shared/               # peças reutilizáveis e sem regra de negócio
│   │   ├── components/       # botao, campo, cartao, selo, modal, alerta, icone, ...
│   │   ├── directives/       # direcao-scroll
│   │   └── pipes/            # moedaBr
│   ├── layout/               # shell autenticado
│   │   ├── shell/            # sidebar + cabeçalho + <router-outlet>
│   │   ├── cabecalho/        # header com auto-hide por direção de scroll
│   │   ├── barra-lateral/    # sidebar fixa do desktop
│   │   ├── menu-mobile/      # gaveta via CDK Overlay + scroll lock iOS
│   │   └── lista-navegacao/  # lista de links compartilhada pelos dois
│   ├── features/             # uma pasta por domínio, cada uma lazy
│   │   ├── auth/             # login e cadastro (implementados)
│   │   ├── dashboard/ transacoes/ metas/ categorias/
│   │   ├── recorrencias/ fiscal/ perfil/          (placeholders)
│   │   └── nao-encontrada/
│   ├── app.config.ts         # providers da aplicação
│   └── app.routes.ts         # mapa de rotas
├── data/                     # TODO o conteúdo textual do app
│   ├── textos.ts             # copy de telas, erros e validações
│   ├── navegacao.ts          # rotas e itens de menu
│   ├── perfis-fiscais.ts     # cards de perfil fiscal e atividades do MEI
│   └── icones.ts             # biblioteca de ícones (SVG por dados)
├── styles/                   # tokens, reset, tipografia, utilitários
└── environments/             # apiUrl por ambiente
```

### Regra de ouro: conteúdo não mora em componente

Nenhum rótulo, título, mensagem de erro ou item de menu é escrito dentro de um `.html` de
componente. Tudo vem de `src/data/`. Isso mantém a revisão de copy em um lugar só e deixa uma
futura i18n a um passo de distância.

```ts
// ❌ não
<h1>Transações</h1>

// ✅ sim
protected readonly pagina = TEXTOS.paginas.transacoes;
<h1>{{ pagina.titulo }}</h1>
```

---

## Sistema de temas

Dois temas completos, trocados por **classe no `<html>`** (`theme-light` / `theme-dark`),
persistidos em `localStorage` sob a chave `fincontrol.tema`. Sem escolha salva, seguimos o
`prefers-color-scheme` do sistema.

| Tema                              | Personalidade                                                  |
| --------------------------------- | -------------------------------------------------------------- |
| **Light — "Fintech clara"** (padrão) | Índigo `#4F46E5`, superfícies brancas, sombra sutilíssima      |
| **Dark — "Editorial noturno"**    | Dourado `#C9A45C`, **sem sombra nenhuma** — profundidade vem de superfície + borda |

O `index.html` aplica a classe do tema **antes do primeiro paint**, num script inline, para o app
não piscar claro antes do Angular subir. O `ServicoTema` assume dali em diante.

### Adicionando uma cor nova

1. Declare o token nos **dois** blocos de `src/styles/_tokens.scss` — `.theme-light` e
   `.theme-dark` — com o mesmo nome:

   ```scss
   .theme-light {
     --info: #0284c7;
     --info-suave: rgba(2, 132, 199, 0.1);
   }

   .theme-dark {
     --info: #56b6e6;
     --info-suave: rgba(86, 182, 230, 0.14);
   }
   ```

2. Consuma sempre via `var(--info)`. **Nenhum hex solto em componente** — hoje o `src/app/`
   inteiro não tem um único `#rrggbb`, e é assim que deve continuar.

3. Se a cor participar de hover/foco, adicione as transições com **lista explícita de
   propriedades**. `transition: all` é proibido no projeto:

   ```scss
   transition:
     background-color var(--duracao-rapida) var(--curva),
     border-color var(--duracao-rapida) var(--curva);
   ```

### Tipografia

- **Fraunces** — títulos e números grandes (`.numero-destaque`)
- **Inter** — corpo, labels e tabelas
- Qualquer valor monetário usa `font-variant-numeric: tabular-nums` (classe `.valor-monetario`)
  e é formatado **exclusivamente** pelo pipe `moedaBr`:

  ```html
  <span class="valor-monetario">{{ saldo | moedaBr }}</span>
  <!-- R$ 1.234,50 -->
  ```

---

## Kit do shell (navbar)

Comportamentos que o shell entrega e que devem ser preservados:

- **Cabeçalho com direção de scroll** — a diretiva `appDirecaoScroll`
  (`shared/directives/direcao-scroll.directive.ts`, com `@HostListener` + signals) aplica as
  classes `esta-oculto` e `esta-rolado` no header. Rolou para baixo, ele sai por `transform`;
  rolou para cima, volta.
- **A borda inferior do header está sempre no DOM.** Ela nasce
  `border-bottom: 1px solid transparent` e só muda de **cor** entre os estados. Nunca insira ou
  remova o elemento da borda — isso causa salto de layout.
- **Menu mobile em portal.** A gaveta é renderizada no nível do `<body>` pelo CDK Overlay, fora da
  árvore do shell, para que nenhum `overflow` ou `transform` de ancestral consiga recortá-la.
- **Scroll lock estilo iOS.** Ao abrir a gaveta (ou um modal), o `ServicoTravaDeScroll` fixa o
  body (`position: fixed; top: -scrollY`) e, ao fechar, devolve a página exatamente para onde
  estava. `overflow: hidden` não segura o Safari mobile; isso segura.
- **Sidebar** fixa à esquerda no desktop, colapsando para o hambúrguer **abaixo de 1024px**. Os
  itens saem de `src/data/navegacao.ts` — os dois menus leem a mesma lista.

---

## Criando uma nova feature

Convenção, usando `transacoes` como molde:

```
src/app/features/relatorios/
├── relatorios.ts           # componente de página
└── relatorios.routes.ts    # export const RELATORIOS_ROUTES: Routes
```

```ts
// relatorios.routes.ts
export const RELATORIOS_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.relatorios.titulo,
    loadComponent: () => import('./relatorios').then((m) => m.RelatoriosPage),
  },
];
```

Depois:

1. Registre a rota como filha do shell em `src/app/app.routes.ts` com `loadChildren`.
2. Adicione a copy em `src/data/textos.ts` (`paginas.relatorios`).
3. Adicione o item em `src/data/navegacao.ts` — a sidebar e o menu mobile passam a exibi-lo
   automaticamente, nos dois temas.

Ícone novo? Descreva os traços em `src/data/icones.ts`; `<app-icone [nome]="'...'" />` faz o resto.

---

## Integração com a API

Models em `src/app/core/models/` espelham os DTOs. Endpoints usados nesta fase:

| Método | Rota             | Corpo             | Resposta                               |
| ------ | ---------------- | ----------------- | -------------------------------------- |
| `POST` | `/auth/registro` | `RegistroRequest` | `TokenResponse`                        |
| `POST` | `/auth/login`    | `Credenciais`     | `{ token, nome, perfilFiscal, papel }` |
| `GET`  | `/usuarios/me`   | —                 | `Usuario`                              |

Regras dos interceptors:

- **`auth.interceptor`** anexa `Authorization: Bearer <token>` em toda chamada, **exceto**
  `/auth/*`.
- **`erro.interceptor`** traduz qualquer falha HTTP para um `ErroApi` com mensagem em português
  (aceitando `mensagem`, `message`, `detail`, `error` ou `title` no corpo) e, em **401 fora de
  `/auth/*`**, limpa a sessão e devolve o usuário para `/login?expirou=1`.

Os services de feature falam com caminhos relativos via `ServicoApi` (`this.api.get('/metas')`) —
nunca com URL absoluta.

---

## Variável de ambiente da API em produção

Angular resolve `environment.*` em tempo de build, então a URL da API entra no build, não em
runtime. O fluxo:

1. `npm run build` executa `scripts/aplicar-api-url.mjs` antes do `ng build`.
2. O script lê `process.env.API_URL` e reescreve `apiUrl` em
   `src/environments/environment.prod.ts`.
3. Sem `API_URL` definida, o valor versionado é mantido (o build não quebra).

```bash
API_URL=https://api.fincontrol.com.br npm run build
```

### Cloudflare Pages

Em **Settings → Environment variables → Production**, adicione:

| Variável  | Valor                              |
| --------- | ---------------------------------- |
| `API_URL` | `https://api.seu-dominio.com.br`   |

E em **Build settings**:

| Campo                | Valor                    |
| -------------------- | ------------------------ |
| Build command        | `npm run build`          |
| Build output         | `dist/fincontrol-web/browser` |
| Node version         | `20` (ou `22`)           |

Como é um SPA com rotas do lado do cliente, adicione um `public/_redirects` com
`/* /index.html 200` antes do primeiro deploy — senão recarregar `/transacoes` devolve 404.

---

## SEO e link preview

O `index.html` já traz `title`, `description`, Open Graph completo, Twitter Card
`summary_large_image`, `canonical` e `theme-color` por tema.

> ⚠️ **Substituir após o deploy:** o placeholder `https://fincontrol.pages.dev` aparece em
> `canonical`, `og:url` e `og:image`. Troque pelos endereços reais — link preview com domínio
> errado não renderiza.

As imagens de `public/` (`og-image.png` 1200×630, `favicon-32.png`, `apple-touch-icon.png`) são
geradas por `npm run gerar:imagens`, que renderiza HTML no Chrome/Edge instalado na máquina. O
`favicon.svg` é vetorial e escrito à mão.

---

## CI

`.github/workflows/ci.yml` roda em push e PR para `main`: Node 20 com cache de npm, `npm ci`,
`npm run lint`, `npm test -- --no-watch` e `npm run build`.

---

## O que ainda não existe

Por decisão de escopo da Fase 1: dashboard com dados, gráficos, e os CRUDs de transações, metas,
categorias, recorrências e fiscal. As rotas e a navegação para todos eles já estão de pé —
cada página exibe "Em construção".
