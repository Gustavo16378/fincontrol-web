import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Superfície padrão do app: cantos de 12px, borda em ambos os temas e sombra
 * sutilíssima apenas no claro (no escuro, `--sombra-card` é `none`).
 */
@Component({
  selector: 'app-cartao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (titulo() || subtitulo()) {
      <header class="cartao__cabecalho">
        @if (titulo(); as textoTitulo) {
          <h2 class="cartao__titulo">{{ textoTitulo }}</h2>
        }
        @if (subtitulo(); as textoSubtitulo) {
          <p class="cartao__subtitulo">{{ textoSubtitulo }}</p>
        }
      </header>
    }
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      padding: var(--esp-6);
      border: 1px solid var(--border);
      border-radius: var(--raio-card);
      background-color: var(--surface);
      box-shadow: var(--sombra-card);
      transition:
        background-color var(--duracao-media) var(--curva),
        border-color var(--duracao-media) var(--curva),
        box-shadow var(--duracao-media) var(--curva);
    }

    :host(.compacto) {
      padding: var(--esp-4);
    }

    .cartao__cabecalho {
      margin-bottom: var(--esp-4);
    }

    .cartao__titulo {
      font-size: var(--tamanho-md);
    }

    .cartao__subtitulo {
      margin-top: var(--esp-1);
      font-size: var(--tamanho-sm);
      color: var(--text-2);
    }
  `,
})
export class CartaoComponent {
  readonly titulo = input('');
  readonly subtitulo = input('');
}
