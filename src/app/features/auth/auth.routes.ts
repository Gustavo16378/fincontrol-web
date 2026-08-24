import { Routes } from '@angular/router';

import { TEXTOS } from '@data/textos';
import { convidadoGuard } from '@core/guards/convidado.guard';

/**
 * Rotas públicas de autenticação.
 *
 * Cada página é carregada sob demanda (`loadComponent`), então nada do
 * formulário de cadastro entra no bundle de quem só vai fazer login.
 */
export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [convidadoGuard],
    title: TEXTOS.auth.login.titulo,
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginPage),
  },
  {
    path: 'cadastro',
    canActivate: [convidadoGuard],
    title: TEXTOS.auth.cadastro.titulo,
    loadComponent: () => import('./pages/cadastro/cadastro').then((m) => m.CadastroPage),
  },
];
