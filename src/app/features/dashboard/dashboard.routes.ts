import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    title: TEXTOS.paginas.dashboard.titulo,
    loadComponent: () => import('./dashboard').then((m) => m.DashboardPage),
  },
];
