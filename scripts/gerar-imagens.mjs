/**
 * Gera as imagens estáticas do `public/` (og-image, ícones PNG) a partir de
 * HTML, usando o Chrome/Edge já instalado na máquina em modo headless.
 *
 * Uso: `npm run gerar:imagens`
 * Navegador alternativo: `BROWSER_PATH="C:\\caminho\\chrome.exe" npm run gerar:imagens`
 *
 * As imagens ficam versionadas no repositório — este script só precisa rodar
 * de novo quando a identidade visual mudar.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raizDoProjeto = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raizDoProjeto, 'public');

const CORES = {
  fundo: '#111315',
  superficie: '#1A1D21',
  borda: '#2A2E33',
  dourado: '#C9A45C',
  texto: '#EDEAE3',
  texto2: '#9BA1A8',
};

const CANDIDATOS = [
  process.env['BROWSER_PATH'],
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const paginaOgImage = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500&display=swap" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; flex-direction: column;
    justify-content: center; gap: 28px; padding: 96px;
    background: ${CORES.fundo};
    background-image: radial-gradient(900px 500px at 82% 12%, rgba(201, 164, 92, 0.16), transparent 68%);
    font-family: 'Inter', system-ui, sans-serif; color: ${CORES.texto};
  }
  .marca { display: flex; align-items: center; gap: 24px; }
  .monograma {
    width: 84px; height: 84px; border-radius: 22px; display: flex;
    align-items: center; justify-content: center;
    background: ${CORES.dourado}; color: ${CORES.fundo};
    font-family: 'Fraunces', Georgia, serif; font-weight: 700; font-size: 48px;
  }
  .nome { font-family: 'Fraunces', Georgia, serif; font-weight: 600; font-size: 76px; letter-spacing: -0.02em; }
  .assinatura { font-family: 'Fraunces', Georgia, serif; font-weight: 600; font-size: 54px; color: ${CORES.dourado}; letter-spacing: -0.015em; }
  .rodape { display: flex; gap: 12px; margin-top: 12px; }
  .pilula {
    padding: 10px 20px; border: 1px solid ${CORES.borda}; border-radius: 999px;
    background: ${CORES.superficie}; color: ${CORES.texto2}; font-size: 22px; font-weight: 500;
  }
</style></head>
<body>
  <div class="marca">
    <div class="monograma">F</div>
    <div class="nome">FinControl</div>
  </div>
  <div class="assinatura">Suas finanças sob controle</div>
  <div class="rodape">
    <span class="pilula">Transações</span>
    <span class="pilula">Metas</span>
    <span class="pilula">Recorrências</span>
    <span class="pilula">Fiscal · MEI e ME</span>
  </div>
</body></html>`;

const paginaIcone = (lado) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" /><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${lado}px; height: ${lado}px; background: ${CORES.fundo}; }
  svg { width: ${lado}px; height: ${lado}px; }
</style></head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="14" fill="${CORES.fundo}" />
    <g fill="${CORES.dourado}">
      <rect x="22" y="16" width="7" height="32" rx="2" />
      <rect x="22" y="16" width="21" height="7" rx="2" />
      <rect x="22" y="28" width="16" height="7" rx="2" />
    </g>
  </svg>
</body></html>`;

const IMAGENS = [
  { arquivo: 'og-image.png', largura: 1200, altura: 630, html: paginaOgImage },
  { arquivo: 'favicon-32.png', largura: 32, altura: 32, html: paginaIcone(32) },
  { arquivo: 'apple-touch-icon.png', largura: 180, altura: 180, html: paginaIcone(180) },
];

function localizarNavegador() {
  const encontrado = CANDIDATOS.find((caminho) => existsSync(caminho));
  if (!encontrado) {
    console.error('[imagens] Chrome ou Edge não encontrado. Informe BROWSER_PATH e rode de novo.');
    process.exit(1);
  }
  return encontrado;
}

const navegador = localizarNavegador();
const trabalho = mkdtempSync(join(tmpdir(), 'fincontrol-imagens-'));
mkdirSync(destino, { recursive: true });

try {
  for (const { arquivo, largura, altura, html } of IMAGENS) {
    const origem = join(trabalho, `${arquivo}.html`);
    writeFileSync(origem, html, 'utf8');

    execFileSync(
      navegador,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--no-sandbox',
        '--force-device-scale-factor=1',
        `--user-data-dir=${join(trabalho, 'perfil')}`,
        `--window-size=${largura},${altura}`,
        `--screenshot=${join(destino, arquivo)}`,
        '--virtual-time-budget=4000',
        pathToFileURL(origem).href,
      ],
      { stdio: 'ignore' },
    );

    console.log(`[imagens] public/${arquivo} (${largura}x${altura})`);
  }
} finally {
  rmSync(trabalho, { recursive: true, force: true });
}
