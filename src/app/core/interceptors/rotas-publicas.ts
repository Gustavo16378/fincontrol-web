/**
 * Endpoints que não levam token e cujo 401 significa "credencial inválida"
 * em vez de "sessão expirada".
 */
export function ehRotaPublicaDaApi(url: string): boolean {
  return /\/auth\//.test(url);
}
