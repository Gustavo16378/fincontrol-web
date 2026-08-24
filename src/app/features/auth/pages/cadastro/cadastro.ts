import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ROTAS, ROTA_INICIAL } from '@data/navegacao';
import { ATIVIDADES_MEI, PERFIS_FISCAIS } from '@data/perfis-fiscais';
import { TEXTOS } from '@data/textos';
import type { AtividadeMei, ErroApi, PerfilFiscal } from '@core/models';
import { AuthService } from '@core/services/auth.service';
import { TAMANHO_MINIMO_SENHA, emailValido, senhasCoincidem } from '@core/utils/validadores';
import { AlertaComponent } from '@shared/components/alerta/alerta';
import { BotaoComponent } from '@shared/components/botao/botao';
import { CampoComponent } from '@shared/components/campo/campo';
import { IconeComponent } from '@shared/components/icone/icone';
import { MolduraAuthComponent } from '@features/auth/components/moldura-auth/moldura-auth';

@Component({
  selector: 'app-cadastro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AlertaComponent,
    BotaoComponent,
    CampoComponent,
    IconeComponent,
    MolduraAuthComponent,
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class CadastroPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly textos = TEXTOS.auth.cadastro;
  protected readonly validacao = TEXTOS.validacao;
  protected readonly rotas = ROTAS;
  protected readonly perfis = PERFIS_FISCAIS;
  protected readonly atividades = ATIVIDADES_MEI;

  protected readonly enviando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly formulario = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, emailValido]],
      senha: ['', [Validators.required, Validators.minLength(TAMANHO_MINIMO_SENHA)]],
      confirmacao: ['', [Validators.required]],
      perfilFiscal: this.fb.nonNullable.control<PerfilFiscal | ''>('', [Validators.required]),
      atividadeMei: this.fb.nonNullable.control<AtividadeMei | ''>(''),
    },
    { validators: senhasCoincidem('senha', 'confirmacao') },
  );

  private readonly perfilAtual = toSignal(this.formulario.controls.perfilFiscal.valueChanges, {
    initialValue: this.formulario.controls.perfilFiscal.value,
  });

  protected readonly ehMei = computed(() => this.perfilAtual() === 'MEI');
  protected readonly atividadeAtual = toSignal(this.formulario.controls.atividadeMei.valueChanges, {
    initialValue: this.formulario.controls.atividadeMei.value,
  });

  /** Só existe erro visível de perfil depois que o usuário tentou enviar. */
  protected readonly erroPerfil = computed(() => this.tentouEnviar() && this.perfilAtual() === '');
  protected readonly erroAtividade = computed(
    () => this.tentouEnviar() && this.ehMei() && this.atividadeAtual() === '',
  );

  private readonly tentouEnviar = signal(false);

  constructor() {
    // Validação condicional: a atividade só é exigida de quem é MEI.
    this.formulario.controls.perfilFiscal.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((perfil) => this.ajustarAtividade(perfil));
  }

  protected enviar(): void {
    if (this.enviando()) {
      return;
    }

    this.erro.set(null);
    this.tentouEnviar.set(true);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue();
    const ehMei = dados.perfilFiscal === 'MEI';

    this.enviando.set(true);

    this.auth
      .registro({
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        senha: dados.senha,
        perfilFiscal: dados.perfilFiscal as PerfilFiscal,
        atividadeMei: ehMei ? (dados.atividadeMei as AtividadeMei) : null,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.enviando.set(false);
          void this.router.navigateByUrl(ROTA_INICIAL);
        },
        error: (falha: ErroApi) => {
          this.enviando.set(false);
          this.erro.set(falha.mensagem);
        },
      });
  }

  private ajustarAtividade(perfil: PerfilFiscal | ''): void {
    const atividade = this.formulario.controls.atividadeMei;

    if (perfil === 'MEI') {
      atividade.setValidators([Validators.required]);
      atividade.updateValueAndValidity({ emitEvent: false });
      return;
    }

    // Deixou de ser MEI: a atividade some do formulário e do payload.
    atividade.clearValidators();
    atividade.setValue('');
  }
}
