import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ROTA_INICIAL } from '@data/navegacao';
import { AuthService } from '@core/services/auth.service';

/** Mantém quem já está logado longe de /login e /cadastro. */
export const convidadoGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.estaLogado() ? router.createUrlTree([ROTA_INICIAL]) : true;
};
