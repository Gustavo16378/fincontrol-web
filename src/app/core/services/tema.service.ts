import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';

import { ServicoArmazenamento } from './armazenamento.service';

export type Tema = 'light' | 'dark';

const CHAVE_TEMA = 'fincontrol.tema';
const CLASSES: Record<Tema, string> = {
  light: 'theme-light',
  dark: 'theme-dark',
};

/**
 * Tema da aplicação.
 *
 * A troca acontece por classe no <html> (`theme-light` / `theme-dark`), que é
 * onde os tokens CSS estão declarados. A escolha do usuário é persistida; sem
 * escolha salva, seguimos a preferência do sistema operacional.
 */
@Injectable({ providedIn: 'root' })
export class ServicoTema {
  private readonly documento = inject(DOCUMENT);
  private readonly armazenamento = inject(ServicoArmazenamento);

  private readonly _tema = signal<Tema>(this.temaInicial());

  readonly tema = this._tema.asReadonly();
  readonly estaEscuro = computed(() => this._tema() === 'dark');

  constructor() {
    effect(() => this.aplicarNoDocumento(this._tema()));
  }

  alternar(): void {
    this.definir(this._tema() === 'dark' ? 'light' : 'dark');
  }

  definir(tema: Tema): void {
    this._tema.set(tema);
    this.armazenamento.gravar(CHAVE_TEMA, tema);
  }

  private temaInicial(): Tema {
    const salvo = this.armazenamento.ler(CHAVE_TEMA);
    if (salvo === 'light' || salvo === 'dark') {
      return salvo;
    }

    // `matchMedia` não existe em toda WebView (nem no jsdom dos testes).
    const janela = this.documento.defaultView;
    if (typeof janela?.matchMedia !== 'function') {
      return 'light';
    }

    return janela.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private aplicarNoDocumento(tema: Tema): void {
    const raiz = this.documento.documentElement;
    raiz.classList.remove(CLASSES.light, CLASSES.dark);
    raiz.classList.add(CLASSES[tema]);
    raiz.style.colorScheme = tema;
  }
}
