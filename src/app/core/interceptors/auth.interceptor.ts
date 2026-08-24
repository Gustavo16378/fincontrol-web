import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { ehRotaPublicaDaApi } from './rotas-publicas';

/**
 * Anexa `Authorization: Bearer <token>` em toda chamada autenticada.
 * Endpoints de `/auth/*` são públicos e saem sem cabeçalho.
 */
export const authInterceptor: HttpInterceptorFn = (requisicao, proxima) => {
  if (ehRotaPublicaDaApi(requisicao.url)) {
    return proxima(requisicao);
  }

  const token = inject(AuthService).token();
  if (!token) {
    return proxima(requisicao);
  }

  return proxima(
    requisicao.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
