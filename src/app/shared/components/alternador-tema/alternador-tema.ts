import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TEXTOS } from '@data/textos';
import { ServicoTema } from '@core/services/tema.service';
import { IconeComponent } from '@shared/components/icone/icone';

/** Botão de troca de tema. O estado real vive no `ServicoTema`. */
@Component({
  selector: 'app-alternador-tema',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconeComponent],
  template: `
    <button
      class="alternador"
      type="button"
      [attr.aria-label]="estaEscuro() ? textos.temaClaro : textos.temaEscuro"
      [attr.title]="estaEscuro() ? textos.temaClaro : textos.temaEscuro"
      (click)="alternar()"
    >
      <app-icone [nome]="estaEscuro() ? 'sol' : 'lua'" [tamanho]="18" />
    </button>
  `,
  styles: `
    .alternador {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border: 1px solid var(--border);
      border-radius: var(--raio-controle);
      background-color: transparent;
      color: var(--text-2);
      transition:
        color var(--duracao-rapida) var(--curva),
        background-color var(--duracao-rapida) var(--curva),
        border-color var(--duracao-rapida) var(--curva);

      &:hover {
        color: var(--text);
        background-color: var(--surface-2);
        border-color: var(--border-forte);
      }
    }
  `,
})
export class AlternadorTemaComponent {
  private readonly servicoTema = inject(ServicoTema);

  protected readonly textos = TEXTOS.layout;
  protected readonly estaEscuro = this.servicoTema.estaEscuro;

  protected alternar(): void {
    this.servicoTema.alternar();
  }
}
