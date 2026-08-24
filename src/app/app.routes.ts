import { Routes } from '@angular/router';

import { ROTA_INICIAL } from '@data/navegacao';
import { authGuard } from '@core/guards/auth.guard';
import { AUTH_ROUTES } from '@features/auth/auth.routes';
import { ShellComponent } from '@layout/shell/shell';

/**
 * Mapa de rotas do app.
 *
 * - `/login` e `/cadastro` são públicas (guardadas por `convidadoGuard`).
 * - Tudo o mais vive dentro do shell autenticado, protegido por `authGuard`,
 *   com cada feature em seu próprio chunk (`loadChildren`).
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ROTA_INICIAL },

  ...AUTH_ROUTES,

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'transacoes',
        loadChildren: () =>
          import('@features/transacoes/transacoes.routes').then((m) => m.TRANSACOES_ROUTES),
      },
      {
        path: 'metas',
        loadChildren: () => import('@features/metas/metas.routes').then((m) => m.METAS_ROUTES),
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('@features/categorias/categorias.routes').then((m) => m.CATEGORIAS_ROUTES),
      },
      {
        path: 'recorrencias',
        loadChildren: () =>
          import('@features/recorrencias/recorrencias.routes').then((m) => m.RECORRENCIAS_ROUTES),
      },
      {
        path: 'fiscal',
        loadChildren: () => import('@features/fiscal/fiscal.routes').then((m) => m.FISCAL_ROUTES),
      },
      {
        path: 'perfil',
        loadChildren: () => import('@features/perfil/perfil.routes').then((m) => m.PERFIL_ROUTES),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('@features/nao-encontrada/nao-encontrada').then((m) => m.NaoEncontradaPage),
  },
];
