import { DOCUMENT, Injectable, inject } from '@angular/core';

/**
 * Trava de rolagem no estilo iOS.
 *
 * `overflow: hidden` no body não segura o Safari mobile. O que funciona é
 * fixar o body e compensar o deslocamento em `top` — depois, ao destravar,
 * devolver a página exatamente para onde estava.
 *
 * Contagem por referência: se dois overlays travarem, só o último a destravar
 * restaura a rolagem.
 */
@Injectable({ providedIn: 'root' })
export class ServicoTravaDeScroll {
  private readonly documento = inject(DOCUMENT);

  private travas = 0;
  private posicaoY = 0;

  travar(): void {
    this.travas += 1;
    if (this.travas > 1) {
      return;
    }

    const janela = this.documento.defaultView;
    const corpo = this.documento.body;
    if (!janela || !corpo) {
      return;
    }

    this.posicaoY = janela.scrollY;
    corpo.style.top = `${-this.posicaoY}px`;
    corpo.classList.add('scroll-travado');
  }

  destravar(): void {
    if (this.travas === 0) {
      return;
    }

    this.travas -= 1;
    if (this.travas > 0) {
      return;
    }

    const janela = this.documento.defaultView;
    const corpo = this.documento.body;
    if (!janela || !corpo) {
      return;
    }

    corpo.classList.remove('scroll-travado');
    corpo.style.removeProperty('top');
    janela.scrollTo({ top: this.posicaoY, behavior: 'auto' });
  }
}
