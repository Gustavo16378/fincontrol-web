import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import type { ItemNavegacao } from '@data/navegacao';
import { IconeComponent } from '@shared/components/icone/icone';

/**
 * Lista de links de navegação, compartilhada pela barra lateral (desktop) e
 * pelo menu mobile. Os itens sempre vêm de `src/data/navegacao.ts`.
 */
@Component({
  selector: 'app-lista-navegacao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, IconeComponent],
  template: `
    <ul class="lista" role="list">
      @for (item of itens(); track item.id) {
        <li>
          <a
            class="lista__link"
            routerLinkActive="lista__link--ativo"
            [routerLink]="item.rota"
            [attr.title]="item.descricao"
            (click)="itemEscolhido.emit(item)"
          >
            <app-icone class="lista__icone" [nome]="item.icone" [tamanho]="19" />
            <span class="lista__textos">
              <span class="lista__rotulo">{{ item.rotulo }}</span>
              @if (mostrarDescricao()) {
                <span class="lista__descricao">{{ item.descricao }}</span>
              }
            </span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
    }

    .lista {
      display: flex;
      flex-direction: column;
      gap: 2px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .lista__link {
      display: flex;
      align-items: center;
      gap: var(--esp-3);
      padding: var(--esp-3);
      border: 1px solid transparent;
      border-radius: var(--raio-controle);
      color: var(--text-2);
      font-size: var(--tamanho-base);
      font-weight: var(--peso-medio);
      transition:
        background-color var(--duracao-rapida) var(--curva),
        border-color var(--duracao-rapida) var(--curva),
        color var(--duracao-rapida) var(--curva);

      &:hover {
        background-color: var(--surface-2);
        color: var(--text);
      }
    }

    .lista__link--ativo {
      background-color: var(--accent-suave);
      color: var(--accent);
    }

    .lista__icone {
      flex-shrink: 0;
    }

    .lista__textos {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .lista__rotulo {
      line-height: 1.35;
    }

    .lista__descricao {
      font-size: var(--tamanho-xs);
      font-weight: var(--peso-normal);
      color: var(--text-3);
      line-height: 1.35;
    }
  `,
})
export class ListaNavegacaoComponent {
  readonly itens = input.required<readonly ItemNavegacao[]>();
  readonly mostrarDescricao = input(false);

  readonly itemEscolhido = output<ItemNavegacao>();
}
