import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { NomeIcone } from '@data/icones';
import { IconeComponent } from '@shared/components/icone/icone';

export type VarianteBotao = 'primario' | 'secundario' | 'fantasma' | 'perigo';
export type TamanhoBotao = 'sm' | 'md' | 'lg';

/**
 * Botão do design system. Sem biblioteca de UI: só tokens e CSS.
 * O rótulo entra por projeção de conteúdo, para que a copy fique em `src/data`.
 */
@Component({
  selector: 'app-botao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconeComponent],
  templateUrl: './botao.html',
  styleUrl: './botao.scss',
})
export class BotaoComponent {
  readonly variante = input<VarianteBotao>('primario');
  readonly tamanho = input<TamanhoBotao>('md');
  readonly tipo = input<'button' | 'submit' | 'reset'>('button');
  readonly desabilitado = input(false);
  readonly carregando = input(false);
  readonly larguraTotal = input(false);
  readonly icone = input<NomeIcone | null>(null);
  readonly rotuloAcessivel = input<string | null>(null);
}
