import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type VarianteSelo = 'neutro' | 'destaque' | 'positivo' | 'negativo' | 'alerta';

/** Etiqueta curta para status, perfil fiscal, tipo de lançamento. */
@Component({
  selector: 'app-selo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'selo',
    '[class.selo--destaque]': "variante() === 'destaque'",
    '[class.selo--positivo]': "variante() === 'positivo'",
    '[class.selo--negativo]': "variante() === 'negativo'",
    '[class.selo--alerta]': "variante() === 'alerta'",
  },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--esp-1);
      padding: 2px var(--esp-2);
      border: 1px solid var(--border);
      border-radius: var(--raio-pilula);
      background-color: var(--surface-2);
      color: var(--text-2);
      font-size: var(--tamanho-xs);
      font-weight: var(--peso-medio);
      line-height: 1.6;
      white-space: nowrap;
      transition:
        background-color var(--duracao-rapida) var(--curva),
        border-color var(--duracao-rapida) var(--curva),
        color var(--duracao-rapida) var(--curva);
    }

    :host(.selo--destaque) {
      border-color: transparent;
      background-color: var(--accent-suave);
      color: var(--accent);
    }

    :host(.selo--positivo) {
      border-color: transparent;
      background-color: var(--positive-suave);
      color: var(--positive);
    }

    :host(.selo--negativo) {
      border-color: transparent;
      background-color: var(--negative-suave);
      color: var(--negative);
    }

    :host(.selo--alerta) {
      border-color: transparent;
      background-color: var(--warning-suave);
      color: var(--warning);
    }
  `,
})
export class SeloComponent {
  readonly variante = input<VarianteSelo>('neutro');
}
