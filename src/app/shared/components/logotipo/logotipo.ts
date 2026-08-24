import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TEXTOS } from '@data/textos';

/** Assinatura visual do FinControl: marca em Fraunces + monograma. */
@Component({
  selector: 'app-logotipo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logotipo__marca" aria-hidden="true">{{ inicial }}</span>
    @if (mostrarNome()) {
      <span class="logotipo__nome">{{ nome }}</span>
    }
    @if (!mostrarNome()) {
      <span class="apenas-leitor-de-tela">{{ nome }}</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--esp-3);
      color: var(--text);
    }

    .logotipo__marca {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background-color: var(--accent);
      color: var(--accent-contraste);
      font-family: var(--fonte-titulo);
      font-size: 1.125rem;
      font-weight: var(--peso-forte);
      line-height: 1;
      transition:
        background-color var(--duracao-media) var(--curva),
        color var(--duracao-media) var(--curva);
    }

    .logotipo__nome {
      font-family: var(--fonte-titulo);
      font-size: var(--tamanho-md);
      font-weight: var(--peso-semi);
      letter-spacing: -0.015em;
    }

    :host(.grande) {
      gap: var(--esp-4);

      .logotipo__marca {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        font-size: 1.5rem;
      }

      .logotipo__nome {
        font-size: var(--tamanho-xl);
      }
    }
  `,
})
export class LogotipoComponent {
  readonly mostrarNome = input(true);

  protected readonly nome = TEXTOS.marca.nome;
  protected readonly inicial = TEXTOS.marca.nome.charAt(0);
}
