import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NAVEGACAO_PRINCIPAL, NAVEGACAO_SECUNDARIA, ROTA_INICIAL } from '@data/navegacao';
import { TEXTOS } from '@data/textos';
import { IconeComponent } from '@shared/components/icone/icone';
import { LogotipoComponent } from '@shared/components/logotipo/logotipo';
import { ListaNavegacaoComponent } from '@layout/lista-navegacao/lista-navegacao';

/** Barra lateral fixa do desktop. Some abaixo de 1024px (vira menu mobile). */
@Component({
  selector: 'app-barra-lateral',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconeComponent, LogotipoComponent, ListaNavegacaoComponent],
  template: `
    <div class="lateral__topo">
      <a class="lateral__logo" [routerLink]="rotaInicial">
        <app-logotipo />
      </a>
    </div>

    <nav class="lateral__navegacao" [attr.aria-label]="textos.navegacaoPrincipal">
      <app-lista-navegacao [itens]="principal" />
    </nav>

    <div class="lateral__rodape">
      <app-lista-navegacao [itens]="secundaria" />
      <button class="lateral__sair" type="button" (click)="sairSolicitado.emit()">
        <app-icone [nome]="'sair'" [tamanho]="19" />
        <span>{{ textos.sair }}</span>
      </button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      width: var(--largura-barra-lateral);
      height: 100dvh;
      padding: var(--esp-5) var(--esp-4);
      border-right: 1px solid var(--border);
      background-color: var(--surface);
      transition:
        background-color var(--duracao-media) var(--curva),
        border-color var(--duracao-media) var(--curva);
    }

    .lateral__topo {
      padding: var(--esp-2) var(--esp-2) var(--esp-6);
    }

    .lateral__logo {
      display: inline-flex;
      border-radius: var(--raio-controle);
    }

    .lateral__navegacao {
      flex: 1;
      overflow-y: auto;
    }

    .lateral__rodape {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-top: var(--esp-4);
      border-top: 1px solid var(--border);
      transition: border-color var(--duracao-media) var(--curva);
    }

    .lateral__sair {
      display: flex;
      align-items: center;
      gap: var(--esp-3);
      padding: var(--esp-3);
      border-radius: var(--raio-controle);
      color: var(--text-2);
      font-size: var(--tamanho-base);
      font-weight: var(--peso-medio);
      text-align: left;
      transition:
        background-color var(--duracao-rapida) var(--curva),
        color var(--duracao-rapida) var(--curva);

      &:hover {
        background-color: var(--negative-suave);
        color: var(--negative);
      }
    }
  `,
})
export class BarraLateralComponent {
  readonly sairSolicitado = output<void>();

  protected readonly principal = NAVEGACAO_PRINCIPAL;
  protected readonly secundaria = NAVEGACAO_SECUNDARIA;
  protected readonly textos = TEXTOS.layout;
  protected readonly rotaInicial = ROTA_INICIAL;
}
