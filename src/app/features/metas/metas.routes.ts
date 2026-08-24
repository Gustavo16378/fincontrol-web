import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const METAS_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.metas.titulo,
    loadComponent: () => import('./metas').then((m) => m.MetasPage),
  },
];
