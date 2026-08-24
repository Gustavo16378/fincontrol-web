import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ROTAS } from '@data/navegacao';
import { TEXTOS } from '@data/textos';
import type { ErroApi } from '@core/models';
import { AuthService } from '@core/services/auth.service';

import { ehRotaPublicaDaApi } from './rotas-publicas';

/**
 * Normaliza qualquer falha HTTP em um `ErroApi` com mensagem em português e,
 * em 401 fora de `/auth/*`, encerra a sessão e volta para o login.
 */
export const erroInterceptor: HttpInterceptorFn = (requisicao, proxima) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return proxima(requisicao).pipe(
    catchError((falha: HttpErrorResponse) => {
      const rotaPublica = ehRotaPublicaDaApi(requisicao.url);

      if (falha.status === 401 && !rotaPublica) {
        auth.encerrarSessao();
        void router.navigate([ROTAS.login], {
          queryParams: { retorno: router.url, expirou: 1 },
        });
      }

      return throwError(() => traduzirErro(falha, rotaPublica));
    }),
  );
};

function traduzirErro(falha: HttpErrorResponse, rotaPublica: boolean): ErroApi {
  const doServidor = extrairMensagem(falha);
  const campos = extrairCampos(falha);

  if (falha.status === 0) {
    return { status: 0, mensagem: TEXTOS.erros.semRede };
  }

  const padrao = mensagemPadrao(falha.status, rotaPublica);
  return { status: falha.status, mensagem: doServidor ?? padrao, ...(campos ? { campos } : {}) };
}

function mensagemPadrao(status: number, rotaPublica: boolean): string {
  const { erros } = TEXTOS;

  switch (status) {
    case 400:
    case 422:
      return erros.generico;
    case 401:
      return rotaPublica ? erros.credenciaisInvalidas : erros.naoAutorizado;
    case 403:
      return erros.proibido;
    case 404:
      return erros.naoEncontrado;
    case 409:
      return erros.conflito;
    default:
      return status >= 500 ? erros.servidor : erros.generico;
  }
}

/** A API pode devolver a mensagem em chaves diferentes; aceitamos as usuais. */
function extrairMensagem(falha: HttpErrorResponse): string | null {
  const corpo = falha.error as unknown;

  if (typeof corpo === 'string' && corpo.trim() && !corpo.trim().startsWith('<')) {
    return corpo.trim();
  }

  if (corpo && typeof corpo === 'object') {
    const registro = corpo as Record<string, unknown>;
    for (const chave of ['mensagem', 'message', 'detail', 'error', 'title']) {
      const valor = registro[chave];
      if (typeof valor === 'string' && valor.trim()) {
        return valor.trim();
      }
    }
  }

  return null;
}

function extrairCampos(falha: HttpErrorResponse): Record<string, string> | null {
  const corpo = falha.error as unknown;
  if (!corpo || typeof corpo !== 'object') {
    return null;
  }

  const bruto =
    (corpo as Record<string, unknown>)['campos'] ?? (corpo as Record<string, unknown>)['errors'];
  if (!bruto || typeof bruto !== 'object') {
    return null;
  }

  const campos: Record<string, string> = {};
  for (const [chave, valor] of Object.entries(bruto as Record<string, unknown>)) {
    if (typeof valor === 'string') {
      campos[chave] = valor;
    } else if (Array.isArray(valor) && typeof valor[0] === 'string') {
      campos[chave] = valor[0];
    }
  }

  return Object.keys(campos).length > 0 ? campos : null;
}
