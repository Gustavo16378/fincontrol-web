/**
 * Injeta a variável de ambiente `API_URL` em `src/environments/environment.prod.ts`
 * antes do build de produção.
 *
 * Uso: `API_URL=https://api.exemplo.com npm run build`
 * Sem `API_URL` definida, o arquivo permanece intocado (fallback do repositório).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raizDoProjeto = join(dirname(fileURLToPath(import.meta.url)), '..');
const arquivo = join(raizDoProjeto, 'src', 'environments', 'environment.prod.ts');

const apiUrl = process.env['API_URL']?.trim();

if (!apiUrl) {
  console.log('[api-url] API_URL não definida — mantendo o valor atual de environment.prod.ts.');
  process.exit(0);
}

if (!/^https?:\/\/|^\//.test(apiUrl)) {
  console.error(`[api-url] API_URL inválida: "${apiUrl}". Use uma URL absoluta ou um caminho.`);
  process.exit(1);
}

const semBarraFinal = apiUrl.replace(/\/+$/, '');
const original = readFileSync(arquivo, 'utf8');
const atualizado = original.replace(/apiUrl: '.*'/, `apiUrl: '${semBarraFinal}'`);

if (original === atualizado) {
  console.error('[api-url] Não foi possível localizar a chave apiUrl em environment.prod.ts.');
  process.exit(1);
}

writeFileSync(arquivo, atualizado, 'utf8');
console.log(`[api-url] environment.prod.ts apontando para ${semBarraFinal}`);
