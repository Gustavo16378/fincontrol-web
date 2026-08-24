import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconeComponent } from '@shared/components/icone/icone';

export type VarianteAlerta = 'erro' | 'aviso' | 'sucesso' | 'info';

/** Mensagem inline — usada para exibir o erro que veio da API nos formulários. */
@Component({
  selector: 'app-alerta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconeComponent],
  template: `
    <app-icone [nome]="variante() === 'sucesso' ? 'verificado' : 'alerta'" [tamanho]="18" />
    <span class="alerta__texto"><ng-content /></span>
  `,
  host: {
    class: 'alerta',
    role: 'alert',
    '[class.alerta--aviso]': "variante() === 'aviso'",
    '[class.alerta--sucesso]': "variante() === 'sucesso'",
    '[class.alerta--info]': "variante() === 'info'",
  },
  styles: `
    :host {
      display: flex;
      align-items: flex-start;
      gap: var(--esp-2);
      padding: var(--esp-3) var(--esp-4);
      border: 1px solid transparent;
      border-radius: var(--raio-controle);
      background-color: var(--negative-suave);
      color: var(--negative);
      font-size: var(--tamanho-sm);
      line-height: 1.45;
    }

    :host(.alerta--aviso) {
      background-color: var(--warning-suave);
      color: var(--warning);
    }

    :host(.alerta--sucesso) {
      background-color: var(--positive-suave);
      color: var(--positive);
    }

    :host(.alerta--info) {
      background-color: var(--accent-suave);
      color: var(--accent);
    }

    .alerta__texto {
      padding-top: 1px;
    }
  `,
})
export class AlertaComponent {
  readonly variante = input<VarianteAlerta>('erro');
}
