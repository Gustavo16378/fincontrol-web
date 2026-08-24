import {
  DOCUMENT,
  Directive,
  HostListener,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

export type DirecaoScroll = 'cima' | 'baixo';

/**
 * Detecta a direção da rolagem da janela e expõe o resultado por signals.
 *
 * Aplicada ao cabeçalho do shell: some ao rolar para baixo, reaparece ao rolar
 * para cima. O elemento nunca sai do DOM — só ganha/perde as classes
 * `esta-oculto` e `esta-rolado`, de modo que a borda inferior do cabeçalho
 * permanece sempre presente e apenas transiciona de cor.
 */
@Directive({
  selector: '[appDirecaoScroll]',
  exportAs: 'direcaoScroll',
  host: {
    '[class.esta-oculto]': 'oculto()',
    '[class.esta-rolado]': 'rolado()',
  },
})
export class DirecaoScrollDirective {
  private readonly documento = inject(DOCUMENT);

  /** Só esconde depois de passar deste ponto (evita sumiço no topo da página). */
  readonly limiarParaOcultar = input(96);
  /** Trava o comportamento — usado enquanto o menu mobile está aberto. */
  readonly desativado = input(false, { alias: 'appDirecaoScrollDesativado' });

  private readonly posicao = signal(0);
  private readonly direcaoAtual = signal<DirecaoScroll>('cima');

  readonly direcao = this.direcaoAtual.asReadonly();
  readonly rolado = computed(() => this.posicao() > 8);
  readonly oculto = computed(
    () =>
      !this.desativado() &&
      this.direcaoAtual() === 'baixo' &&
      this.posicao() > this.limiarParaOcultar(),
  );

  private ultimaPosicao = 0;

  constructor() {
    // A página pode iniciar já rolada (recarregar no meio de uma lista).
    afterNextRender(() => this.medir());
  }

  @HostListener('window:scroll')
  protected aoRolar(): void {
    this.medir();
  }

  private medir(): void {
    const janela = this.documento.defaultView;
    if (!janela) {
      return;
    }

    const atual = Math.max(0, janela.scrollY);
    const deslocamento = atual - this.ultimaPosicao;

    // Ignora micro-oscilações (trackpad, bounce do iOS).
    if (Math.abs(deslocamento) < 4) {
      this.posicao.set(atual);
      return;
    }

    this.direcaoAtual.set(deslocamento > 0 ? 'baixo' : 'cima');
    this.posicao.set(atual);
    this.ultimaPosicao = atual;
  }
}
