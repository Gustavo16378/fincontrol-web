import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { type DesenhoIcone, ICONES, type NomeIcone } from '@data/icones';

/**
 * Ícone de traço, desenhado a partir de `src/data/icones.ts`.
 * Herda a cor do contexto (`currentColor`), então funciona nos dois temas.
 */
@Component({
  selector: 'app-icone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="tamanho()"
      [attr.height]="tamanho()"
      [attr.stroke-width]="espessura()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (traco of desenho().tracos ?? []; track traco) {
        <svg:path [attr.d]="traco" />
      }
      @for (circulo of desenho().circulos ?? []; track $index) {
        <svg:circle [attr.cx]="circulo.cx" [attr.cy]="circulo.cy" [attr.r]="circulo.r" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }
  `,
})
export class IconeComponent {
  readonly nome = input.required<NomeIcone>();
  readonly tamanho = input(20);
  readonly espessura = input(1.6);

  protected readonly desenho = computed<DesenhoIcone>(() => ICONES[this.nome()]);
}
