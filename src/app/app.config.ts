import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';

import { EstrategiaDeTitulo } from '@core/estrategia-titulo';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { erroInterceptor } from '@core/interceptors/erro.interceptor';
import { ServicoTema } from '@core/services/tema.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),

    // A ordem importa: o de autenticação injeta o token, o de erro traduz a falha.
    provideHttpClient(withInterceptors([authInterceptor, erroInterceptor])),

    { provide: TitleStrategy, useClass: EstrategiaDeTitulo },

    // Garante que o tema seja resolvido no bootstrap, e não só quando alguém
    // renderiza o alternador.
    provideAppInitializer(() => {
      inject(ServicoTema);
    }),
  ],
};
