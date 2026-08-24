import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TEXTOS } from '@data/textos';
import { AlternadorTemaComponent } from '@shared/components/alternador-tema/alternador-tema';
import { LogotipoComponent } from '@shared/components/logotipo/logotipo';

/**
 * Moldura das telas de autenticação: conteúdo centrado, logotipo em Fraunces e
 * alternador de tema sempre acessível. Respeita o tema ativo como o resto do app.
 */
@Component({
  selector: 'app-moldura-auth',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlternadorTemaComponent, LogotipoComponent],
  template: `
    <div class="moldura__topo">
      <app-alternador-tema />
    </div>

    <main class="moldura__centro">
      <div class="moldura__caixa">
        <header class="moldura__marca">
          <app-logotipo class="grande" />
          <p class="moldura__assinatura">{{ assinatura }}</p>
        </header>

        <section class="moldura__cartao">
          <header class="moldura__cabecalho">
            <h1 class="moldura__titulo">{{ titulo() }}</h1>
            <p class="moldura__subtitulo">{{ subtitulo() }}</p>
          </header>

          <ng-content />
        </section>

        <p class="moldura__rodape">
          <ng-content select="[rodape]" />
        </p>
      </div>
    </main>
  `,
  styleUrl: './moldura-auth.scss',
})
export class MolduraAuthComponent {
  readonly titulo = input.required<string>();
  readonly subtitulo = input.required<string>();

  protected readonly assinatura = TEXTOS.marca.assinatura;
}
