/** Perfil fiscal do usuário — define quais módulos fiscais ficam disponíveis. */
export type PerfilFiscal = 'PESSOA_FISICA' | 'MEI' | 'ME';

/** Ramo de atuação declarado por quem é MEI. */
export type AtividadeMei = 'COMERCIO' | 'SERVICOS' | 'AMBOS';

/** Papel do usuário dentro do sistema. */
export type Papel = 'USUARIO' | 'ADMIN';

/** Usuário autenticado, espelhando o DTO de `GET /usuarios/me`. */
export interface Usuario {
  id?: number;
  nome: string;
  email?: string;
  perfilFiscal: PerfilFiscal;
  papel: Papel;
  atividadeMei?: AtividadeMei | null;
  criadoEm?: string;
}
