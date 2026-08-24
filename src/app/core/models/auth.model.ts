import type { AtividadeMei, Papel, PerfilFiscal } from './usuario.model';

/** Corpo de `POST /auth/login`. */
export interface Credenciais {
  email: string;
  senha: string;
}

/** Corpo de `POST /auth/registro`. */
export interface RegistroRequest {
  nome: string;
  email: string;
  senha: string;
  perfilFiscal: PerfilFiscal;
  atividadeMei?: AtividadeMei | null;
}

/** Resposta de `POST /auth/login` e `POST /auth/registro`. */
export interface TokenResponse {
  token: string;
  nome: string;
  perfilFiscal: PerfilFiscal;
  papel: Papel;
}

/** Sessão persistida em localStorage. */
export interface SessaoArmazenada {
  token: string;
  usuario: {
    nome: string;
    perfilFiscal: PerfilFiscal;
    papel: Papel;
  };
}
