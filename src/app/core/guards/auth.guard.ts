import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROTAS } from '@data/navegacao';
import { AuthService } from '@core/services/auth.service';

/** Protege o shell autenticado: sem sessão, vai para o login. */
export const authGuard: CanActivateFn = (_rota, estado) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaLogado()) {
    return true;
  }

  return router.createUrlTree([ROTAS.login], {
    queryParams: estado.url && estado.url !== '/' ? { retorno: estado.url } : {},
  });
};
