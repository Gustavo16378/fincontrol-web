/**
 * Ambiente de desenvolvimento.
 *
 * `apiUrl` aponta para `/api`, que o `proxy.conf.json` encaminha para
 * `http://localhost:8080` (fincontrol-api) durante o `ng serve`.
 */
export const environment = {
  producao: false,
  apiUrl: '/api',
};
