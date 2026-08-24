import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const PERFIL_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.perfil.titulo,
    loadComponent: () => import('./perfil').then((m) => m.PerfilPage),
  },
];
