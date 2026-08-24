/**
 * Ambiente de produção.
 *
 * NÃO edite `apiUrl` à mão para fazer deploy: o valor abaixo é reescrito no
 * momento do build por `scripts/aplicar-api-url.mjs`, que lê a variável de
 * ambiente `API_URL`. No Cloudflare Pages basta cadastrar `API_URL` em
 * Settings > Environment variables (build) — veja o README.
 *
 * Quando `API_URL` não está definida, o valor abaixo é mantido como está.
 */
export const environment = {
  producao: true,
  apiUrl: 'https://api.fincontrol.app',
};
