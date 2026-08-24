import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import type { NomeIcone } from '@data/icones';
import { TEXTOS } from '@data/textos';
import { mensagemDeErro } from '@core/utils/validadores';
import { IconeComponent } from '@shared/components/icone/icone';

export type TipoCampo = 'text' | 'email' | 'password' | 'tel' | 'number';

let sequencia = 0;

/**
 * Campo de formulário (label + input + mensagem de erro) ligado a um
 * `FormControl` de Reactive Forms. Campos do tipo `password` ganham botão de
 * mostrar/ocultar.
 */
@Component({
  selector: 'app-campo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, IconeComponent],
  templateUrl: './campo.html',
  styleUrl: './campo.scss',
})
export class CampoComponent {
  readonly controle = input.required<FormControl<string>>();
  readonly rotulo = input.required<string>();
  readonly tipo = input<TipoCampo>('text');
  readonly placeholder = input('');
  readonly autocomplete = input<string | null>(null);
  readonly icone = input<NomeIcone | null>(null);
  readonly dica = input<string | null>(null);

  protected readonly textos = TEXTOS.comum;
  protected readonly senhaVisivel = signal(false);
  protected readonly idCampo = `campo-${(sequencia += 1)}`;
  protected readonly idErro = `${this.idCampo}-erro`;

  protected readonly ehSenha = computed(() => this.tipo() === 'password');
  protected readonly tipoEfetivo = computed(() =>
    this.ehSenha() && this.senhaVisivel() ? 'text' : this.tipo(),
  );

  protected erro(): string | null {
    return mensagemDeErro(this.controle());
  }

  protected alternarSenha(): void {
    this.senhaVisivel.update((visivel) => !visivel);
  }
}
