import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TEXTOS } from '@data/textos';

const TITULO_PADRAO = `${TEXTOS.marca.nome} — ${TEXTOS.marca.assinatura}`;

/** Compõe `<title>` a partir do `title` da rota, sempre com a marca no fim. */
@Injectable({ providedIn: 'root' })
export class EstrategiaDeTitulo extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(estado: RouterStateSnapshot): void {
    const titulo = this.buildTitle(estado);
    this.title.setTitle(titulo ? `${titulo} · ${TEXTOS.marca.nome}` : TITULO_PADRAO);
  }
}
