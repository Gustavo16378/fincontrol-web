import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const FISCAL_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.fiscal.titulo,
    loadComponent: () => import('./fiscal').then((m) => m.FiscalPage),
  },
];
