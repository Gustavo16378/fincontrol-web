import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const RECORRENCIAS_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.recorrencias.titulo,
    loadComponent: () => import('./recorrencias').then((m) => m.RecorrenciasPage),
  },
];
