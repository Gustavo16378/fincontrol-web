/**
 * Biblioteca de ícones do FinControl.
 *
 * Sem dependência externa: cada ícone é descrito por traços em uma viewBox
 * 24×24 e desenhado pelo componente `app-icone` com `currentColor`.
 */

export interface CirculoIcone {
  cx: number;
  cy: number;
  r: number;
}

export interface DesenhoIcone {
  /** Comandos `d` de <path>. */
  tracos?: readonly string[];
  /** Círculos desenhados por cima dos traços. */
  circulos?: readonly CirculoIcone[];
}

export const ICONES = {
  painel: {
    tracos: ['M4 4h6v7H4z', 'M14 4h6v4h-6z', 'M14 12h6v8h-6z', 'M4 15h6v5H4z'],
  },
  transacoes: {
    tracos: ['M3.5 8h13.5', 'M13.5 4.5 17 8l-3.5 3.5', 'M20.5 16H7', 'M10.5 12.5 7 16l3.5 3.5'],
  },
  metas: {
    circulos: [
      { cx: 12, cy: 12, r: 8.2 },
      { cx: 12, cy: 12, r: 4.4 },
      { cx: 12, cy: 12, r: 1.2 },
    ],
  },
  categorias: {
    tracos: ['M11.6 3.2H4.2v7.4l9.4 9.4 7.4-7.4-9.4-9.4Z'],
    circulos: [{ cx: 8, cy: 7.6, r: 1.3 }],
  },
  recorrencias: {
    tracos: [
      'M3.6 12a8.4 8.4 0 0 1 14.3-6',
      'M18.2 2.9v3.6h-3.6',
      'M20.4 12a8.4 8.4 0 0 1-14.3 6',
      'M5.8 21.1v-3.6h3.6',
    ],
  },
  fiscal: {
    tracos: ['M6 3.2h8L18.2 7.4V20.8H6z', 'M13.8 3.2v4.4h4.4', 'M9 12.6h6', 'M9 16.2h4'],
  },
  perfil: {
    tracos: ['M4.6 20.4a7.4 7.4 0 0 1 14.8 0'],
    circulos: [{ cx: 12, cy: 8, r: 3.6 }],
  },
  sair: {
    tracos: ['M14 3.6H5v16.8h9', 'M18.6 12H9.4', 'M15.4 8.4 19 12l-3.6 3.6'],
  },
  menu: {
    tracos: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  },
  fechar: {
    tracos: ['M6.2 6.2 17.8 17.8', 'M17.8 6.2 6.2 17.8'],
  },
  sol: {
    tracos: [
      'M12 2.4v2.2',
      'M12 19.4v2.2',
      'M2.4 12h2.2',
      'M19.4 12h2.2',
      'M5.2 5.2 6.8 6.8',
      'M17.2 17.2l1.6 1.6',
      'M18.8 5.2 17.2 6.8',
      'M6.8 17.2 5.2 18.8',
    ],
    circulos: [{ cx: 12, cy: 12, r: 4.2 }],
  },
  lua: {
    tracos: ['M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8Z'],
  },
  pessoaFisica: {
    tracos: ['M4.6 20.4a7.4 7.4 0 0 1 14.8 0'],
    circulos: [{ cx: 12, cy: 8, r: 3.6 }],
  },
  loja: {
    tracos: ['M3.4 9.2h17.2l-1.5-4.8H4.9z', 'M5.2 9.2v11.4h13.6V9.2', 'M9.6 20.6v-6.2h4.8v6.2'],
  },
  empresa: {
    tracos: [
      'M4 20.6V6.2l7-3v17.4',
      'M11 20.6V9.4l8.6 2.6v8.6',
      'M3 20.6h18',
      'M7 8.6h1.4',
      'M7 12.2h1.4',
      'M7 15.8h1.4',
      'M14.6 13.8h1.6',
      'M14.6 16.8h1.6',
    ],
  },
  comercio: {
    tracos: ['M2.6 3.6h2.7l2.4 11.6h10.4L20.6 7.2H6.2'],
    circulos: [
      { cx: 9.6, cy: 19.6, r: 1.3 },
      { cx: 17.2, cy: 19.6, r: 1.3 },
    ],
  },
  servicos: {
    tracos: [
      'M20.4 5.6a4.6 4.6 0 0 1-6 6L6.2 19.8a2.1 2.1 0 0 1-3-3l8.2-8.2a4.6 4.6 0 0 1 6-6l-2.9 2.9 3 3 2.9-2.9Z',
    ],
  },
  ambos: {
    circulos: [
      { cx: 9.2, cy: 12, r: 5.4 },
      { cx: 14.8, cy: 12, r: 5.4 },
    ],
  },
  alerta: {
    tracos: ['M12 3.6 2.8 20.4h18.4z', 'M12 9.8v4.6'],
    circulos: [{ cx: 12, cy: 17.4, r: 0.9 }],
  },
  olho: {
    tracos: ['M2.5 12S6 5.6 12 5.6 21.5 12 21.5 12 18 18.4 12 18.4 2.5 12 2.5 12Z'],
    circulos: [{ cx: 12, cy: 12, r: 3.2 }],
  },
  olhoFechado: {
    tracos: [
      'M3.8 3.8 20.2 20.2',
      'M9.9 5.9A9.7 9.7 0 0 1 12 5.6c6 0 9.5 6.4 9.5 6.4a17.4 17.4 0 0 1-3.5 4.2',
      'M6.5 7.9A16.9 16.9 0 0 0 2.5 12S6 18.4 12 18.4a9.5 9.5 0 0 0 3.6-.7',
    ],
  },
  verificado: {
    tracos: ['M8.2 12.3 10.8 14.9 16 9.4'],
    circulos: [{ cx: 12, cy: 12, r: 8.6 }],
  },
  setaDireita: {
    tracos: ['M4.6 12h14', 'M13 6.6 18.4 12 13 17.4'],
  },
  cadeado: {
    tracos: ['M5.4 10.6h13.2v9.8H5.4z', 'M8.6 10.6V7.8a3.4 3.4 0 0 1 6.8 0v2.8'],
  },
  email: {
    tracos: ['M3 5.6h18v12.8H3z', 'M3.5 6.3 12 12.9l8.5-6.6'],
  },
  chevronBaixo: {
    tracos: ['M6.6 9.6 12 15l5.4-5.4'],
  },
  construcao: {
    tracos: ['M9.4 3.6h5.2l3.6 16.8H5.8z', 'M6.9 11.6h10.2', 'M6 16.2h12', 'M3.4 20.4h17.2'],
  },
  bussola: {
    tracos: ['M14.8 9.2 13.4 13.4 9.2 14.8 10.6 10.6z'],
    circulos: [{ cx: 12, cy: 12, r: 8.6 }],
  },
} as const satisfies Record<string, DesenhoIcone>;

export type NomeIcone = keyof typeof ICONES;
