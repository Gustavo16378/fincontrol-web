import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ROTAS, ROTA_INICIAL } from '@data/navegacao';
import { TEXTOS } from '@data/textos';
import type { ErroApi } from '@core/models';
import { AuthService } from '@core/services/auth.service';
import { emailValido } from '@core/utils/validadores';
import { AlertaComponent } from '@shared/components/alerta/alerta';
import { BotaoComponent } from '@shared/components/botao/botao';
import { CampoComponent } from '@shared/components/campo/campo';
import { MolduraAuthComponent } from '@features/auth/components/moldura-auth/moldura-auth';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AlertaComponent,
    BotaoComponent,
    CampoComponent,
    MolduraAuthComponent,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly rotaAtiva = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly textos = TEXTOS.auth.login;
  protected readonly rotas = ROTAS;

  protected readonly enviando = signal(false);
  protected readonly erro = signal<string | null>(this.mensagemDeSessaoExpirada());

  protected readonly formulario = this.fb.nonNullable.group({
    email: ['', [Validators.required, emailValido]],
    senha: ['', [Validators.required]],
  });

  protected enviar(): void {
    if (this.enviando()) {
      return;
    }

    this.erro.set(null);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { email, senha } = this.formulario.getRawValue();
    this.enviando.set(true);

    this.auth
      .login({ email: email.trim(), senha })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.enviando.set(false);
          void this.router.navigateByUrl(this.destino());
        },
        error: (falha: ErroApi) => {
          this.enviando.set(false);
          this.erro.set(falha.mensagem);
        },
      });
  }

  /** Volta para a página que o usuário tentou abrir antes do login. */
  private destino(): string {
    const retorno = this.rotaAtiva.snapshot.queryParamMap.get('retorno');
    return retorno && retorno.startsWith('/') && !retorno.startsWith('//') ? retorno : ROTA_INICIAL;
  }

  private mensagemDeSessaoExpirada(): string | null {
    return this.rotaAtiva.snapshot.queryParamMap.get('expirou') === '1'
      ? TEXTOS.erros.naoAutorizado
      : null;
  }
}
