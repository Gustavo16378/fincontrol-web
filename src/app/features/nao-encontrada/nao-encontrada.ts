import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ROTA_INICIAL } from '@data/navegacao';
import { TEXTOS } from '@data/textos';
import { LogotipoComponent } from '@shared/components/logotipo/logotipo';

@Component({
  selector: 'app-nao-encontrada',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LogotipoComponent],
  template: `
    <div class="erro">
      <app-logotipo />
      <p class="erro__codigo">404</p>
      <h1 class="erro__titulo">{{ pagina.titulo }}</h1>
      <p class="erro__resumo">{{ pagina.resumo }}</p>
      <a class="erro__acao" [routerLink]="rotaInicial">{{ pagina.acao }}</a>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      padding: var(--esp-6);
      background-color: var(--bg);
    }

    .erro {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--esp-3);
      text-align: center;
    }

    .erro__codigo {
      margin-top: var(--esp-6);
      font-family: var(--fonte-titulo);
      font-size: var(--tamanho-2xl);
      font-variant-numeric: tabular-nums;
      color: var(--text-3);
      line-height: 1;
    }

    .erro__titulo {
      font-size: var(--tamanho-lg);
    }

    .erro__resumo {
      max-width: 44ch;
      color: var(--text-2);
    }

    .erro__acao {
      display: inline-flex;
      align-items: center;
      min-height: 42px;
      margin-top: var(--esp-3);
      padding: 0 var(--esp-5);
      border-radius: var(--raio-controle);
      background-color: var(--accent);
      color: var(--accent-contraste);
      font-weight: var(--peso-medio);
      transition: background-color var(--duracao-rapida) var(--curva);

      &:hover {
        background-color: var(--accent-hover);
      }
    }
  `,
})
export class NaoEncontradaPage {
  protected readonly pagina = TEXTOS.paginas.naoEncontrada;
  protected readonly rotaInicial = ROTA_INICIAL;
}
