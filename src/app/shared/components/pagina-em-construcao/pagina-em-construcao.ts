import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { NomeIcone } from '@data/icones';
import { TEXTOS } from '@data/textos';
import { CartaoComponent } from '@shared/components/cartao/cartao';
import { IconeComponent } from '@shared/components/icone/icone';
import { SeloComponent } from '@shared/components/selo/selo';

/**
 * Página-modelo das features que ainda não foram implementadas.
 * Existe para validar shell, navegação e temas de ponta a ponta na Fase 1.
 */
@Component({
  selector: 'app-pagina-em-construcao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CartaoComponent, IconeComponent, SeloComponent],
  template: `
    <header class="pagina__cabecalho">
      <div class="pagina__identidade">
        <span class="pagina__icone" aria-hidden="true">
          <app-icone [nome]="icone()" [tamanho]="22" />
        </span>
        <div>
          <h1 class="pagina__titulo">{{ titulo() }}</h1>
          <p class="pagina__resumo">{{ resumo() }}</p>
        </div>
      </div>
      <app-selo [variante]="'alerta'">{{ textos.emConstrucao }}</app-selo>
    </header>

    <app-cartao>
      <p class="pagina__aviso">{{ textos.emConstrucaoDetalhe }}</p>
    </app-cartao>
  `,
  styles: `
    :host {
      display: block;
    }

    .pagina__cabecalho {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--esp-4);
      margin-bottom: var(--esp-6);
    }

    .pagina__identidade {
      display: flex;
      align-items: flex-start;
      gap: var(--esp-4);
    }

    .pagina__icone {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: var(--raio-controle);
      background-color: var(--accent-suave);
      color: var(--accent);
    }

    .pagina__titulo {
      font-size: var(--tamanho-xl);
    }

    .pagina__resumo {
      margin-top: var(--esp-1);
      max-width: 56ch;
      color: var(--text-2);
    }

    .pagina__aviso {
      color: var(--text-2);
    }
  `,
})
export class PaginaEmConstrucaoComponent {
  readonly titulo = input.required<string>();
  readonly resumo = input.required<string>();
  readonly icone = input.required<NomeIcone>();

  protected readonly textos = TEXTOS.comum;
}
