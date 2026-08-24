import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const CATEGORIAS_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.categorias.titulo,
    loadComponent: () => import('./categorias').then((m) => m.CategoriasPage),
  },
];
