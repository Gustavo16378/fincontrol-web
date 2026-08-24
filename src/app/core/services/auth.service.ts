import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

import { ROTAS } from '@data/navegacao';
import type {
  Credenciais,
  RegistroRequest,
  SessaoArmazenada,
  TokenResponse,
  Usuario,
} from '@core/models';

import { ServicoApi } from './api.service';
import { ServicoArmazenamento } from './armazenamento.service';

const CHAVE_SESSAO = 'fincontrol.sessao';

/**
 * Sessão do usuário.
 *
 * Estado exposto por signals (`usuarioAtual`, `estaLogado`); o token fica em
 * localStorage e é lido pelo interceptor a cada requisição.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ServicoApi);
  private readonly armazenamento = inject(ServicoArmazenamento);
  private readonly router = inject(Router);

  private readonly _usuarioAtual = signal<Usuario | null>(null);
  private readonly _token = signal<string | null>(null);

  readonly usuarioAtual = this._usuarioAtual.asReadonly();
  readonly token = this._token.asReadonly();
  readonly estaLogado = computed(() => this._token() !== null);
  readonly primeiroNome = computed(() => this._usuarioAtual()?.nome.trim().split(/\s+/)[0] ?? '');

  constructor() {
    this.restaurarSessao();
  }

  /** `POST /auth/login` */
  login(credenciais: Credenciais): Observable<TokenResponse> {
    return this.api
      .post<TokenResponse>('/auth/login', credenciais)
      .pipe(tap((resposta) => this.iniciarSessao(resposta)));
  }

  /** `POST /auth/registro` */
  registro(dados: RegistroRequest): Observable<TokenResponse> {
    return this.api
      .post<TokenResponse>('/auth/registro', dados)
      .pipe(tap((resposta) => this.iniciarSessao(resposta)));
  }

  /** `GET /usuarios/me` — completa o usuário logado com os dados do servidor. */
  carregarUsuario(): Observable<Usuario | null> {
    return this.api.get<Usuario>('/usuarios/me').pipe(
      tap((usuario) => this.atualizarUsuario(usuario)),
      catchError(() => of(null)),
    );
  }

  /** Encerra a sessão e devolve o usuário para a tela de login. */
  logout(): void {
    this.encerrarSessao();
    void this.router.navigate([ROTAS.login]);
  }

  /** Limpa a sessão sem navegar (usado pelo interceptor de erro em 401). */
  encerrarSessao(): void {
    this._token.set(null);
    this._usuarioAtual.set(null);
    this.armazenamento.remover(CHAVE_SESSAO);
  }

  private iniciarSessao(resposta: TokenResponse): void {
    const usuario: Usuario = {
      nome: resposta.nome,
      perfilFiscal: resposta.perfilFiscal,
      papel: resposta.papel,
    };

    this._token.set(resposta.token);
    this._usuarioAtual.set(usuario);
    this.armazenamento.gravarJson(CHAVE_SESSAO, { token: resposta.token, usuario });
  }

  private atualizarUsuario(usuario: Usuario): void {
    this._usuarioAtual.set(usuario);

    const token = this._token();
    if (token) {
      this.armazenamento.gravarJson(CHAVE_SESSAO, { token, usuario });
    }
  }

  /** Lê a sessão persistida na inicialização, antes do primeiro render. */
  private restaurarSessao(): void {
    const sessao = this.armazenamento.lerJson<SessaoArmazenada>(CHAVE_SESSAO);
    if (!sessao?.token || !sessao.usuario) {
      return;
    }

    this._token.set(sessao.token);
    this._usuarioAtual.set(sessao.usuario);
  }
}
