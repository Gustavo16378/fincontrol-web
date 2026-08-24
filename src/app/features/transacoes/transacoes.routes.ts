import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const TRANSACOES_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.transacoes.titulo,
    loadComponent: () => import('./transacoes').then((m) => m.TransacoesPage),
  },
];
