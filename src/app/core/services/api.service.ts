import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

type ParametrosConsulta = Record<string, string | number | boolean | undefined | null>;

/**
 * Camada fina sobre o HttpClient: concentra a base da API em um lugar só.
 *
 * Os services de feature falam com caminhos relativos (`/auth/login`) e nunca
 * com URL absoluta.
 */
@Injectable({ providedIn: 'root' })
export class ServicoApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl.replace(/\/+$/, '');

  get<T>(caminho: string, parametros?: ParametrosConsulta): Observable<T> {
    return this.http.get<T>(this.url(caminho), { params: this.montarParametros(parametros) });
  }

  post<T>(caminho: string, corpo?: unknown): Observable<T> {
    return this.http.post<T>(this.url(caminho), corpo ?? {});
  }

  put<T>(caminho: string, corpo?: unknown): Observable<T> {
    return this.http.put<T>(this.url(caminho), corpo ?? {});
  }

  patch<T>(caminho: string, corpo?: unknown): Observable<T> {
    return this.http.patch<T>(this.url(caminho), corpo ?? {});
  }

  delete<T>(caminho: string): Observable<T> {
    return this.http.delete<T>(this.url(caminho));
  }

  private url(caminho: string): string {
    return `${this.base}${caminho.startsWith('/') ? caminho : `/${caminho}`}`;
  }

  private montarParametros(parametros?: ParametrosConsulta): HttpParams {
    let httpParams = new HttpParams();
    if (!parametros) {
      return httpParams;
    }

    for (const [chave, valor] of Object.entries(parametros)) {
      if (valor !== undefined && valor !== null && valor !== '') {
        httpParams = httpParams.set(chave, String(valor));
      }
    }
    return httpParams;
  }
}
