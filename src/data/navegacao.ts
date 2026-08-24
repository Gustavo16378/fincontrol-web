import type { NomeIcone } from './icones';

/**
 * Caminhos das rotas em um só lugar — nada de string solta em componente.
 */
export const ROTAS = {
  login: '/login',
  cadastro: '/cadastro',
  dashboard: '/dashboard',
  transacoes: '/transacoes',
  metas: '/metas',
  categorias: '/categorias',
  recorrencias: '/recorrencias',
  fiscal: '/fiscal',
  perfil: '/perfil',
} as const;

export const ROTA_INICIAL = ROTAS.dashboard;

export interface ItemNavegacao {
  readonly id: string;
  readonly rotulo: string;
  readonly rota: string;
  readonly icone: NomeIcone;
  /** Descrição curta, usada como `title` e no menu mobile. */
  readonly descricao: string;
}

/** Itens da barra lateral / menu mobile do shell autenticado. */
export const NAVEGACAO_PRINCIPAL: readonly ItemNavegacao[] = [
  {
    id: 'dashboard',
    rotulo: 'Visão geral',
    rota: ROTAS.dashboard,
    icone: 'painel',
    descricao: 'Saldo, entradas e saídas do mês',
  },
  {
    id: 'transacoes',
    rotulo: 'Transações',
    rota: ROTAS.transacoes,
    icone: 'transacoes',
    descricao: 'Lançamentos de entrada e saída',
  },
  {
    id: 'metas',
    rotulo: 'Metas',
    rota: ROTAS.metas,
    icone: 'metas',
    descricao: 'Objetivos financeiros e progresso',
  },
  {
    id: 'categorias',
    rotulo: 'Categorias',
    rota: ROTAS.categorias,
    icone: 'categorias',
    descricao: 'Organização dos lançamentos',
  },
  {
    id: 'recorrencias',
    rotulo: 'Recorrências',
    rota: ROTAS.recorrencias,
    icone: 'recorrencias',
    descricao: 'Contas fixas e assinaturas',
  },
  {
    id: 'fiscal',
    rotulo: 'Fiscal',
    rota: ROTAS.fiscal,
    icone: 'fiscal',
    descricao: 'DAS, limites do MEI e obrigações',
  },
];

/** Itens do rodapé da barra lateral. */
export const NAVEGACAO_SECUNDARIA: readonly ItemNavegacao[] = [
  {
    id: 'perfil',
    rotulo: 'Perfil',
    rota: ROTAS.perfil,
    icone: 'perfil',
    descricao: 'Seus dados e preferências',
  },
];
