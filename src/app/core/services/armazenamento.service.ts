import { Injectable } from '@angular/core';

/**
 * Acesso tolerante a falhas ao localStorage.
 *
 * Navegação anônima e políticas corporativas podem lançar em `localStorage`;
 * aqui a falha vira "sem valor guardado" em vez de derrubar a aplicação.
 */
@Injectable({ providedIn: 'root' })
export class ServicoArmazenamento {
  private readonly disponivel = this.detectarDisponibilidade();

  ler(chave: string): string | null {
    if (!this.disponivel) {
      return null;
    }
    try {
      return localStorage.getItem(chave);
    } catch {
      return null;
    }
  }

  lerJson<T>(chave: string): T | null {
    const bruto = this.ler(chave);
    if (bruto === null) {
      return null;
    }
    try {
      return JSON.parse(bruto) as T;
    } catch {
      return null;
    }
  }

  gravar(chave: string, valor: string): void {
    if (!this.disponivel) {
      return;
    }
    try {
      localStorage.setItem(chave, valor);
    } catch {
      /* cota estourada ou storage bloqueado: seguimos sem persistir */
    }
  }

  gravarJson(chave: string, valor: unknown): void {
    this.gravar(chave, JSON.stringify(valor));
  }

  remover(chave: string): void {
    if (!this.disponivel) {
      return;
    }
    try {
      localStorage.removeItem(chave);
    } catch {
      /* idem */
    }
  }

  private detectarDisponibilidade(): boolean {
    try {
      const chaveTeste = '__fincontrol_teste__';
      localStorage.setItem(chaveTeste, '1');
      localStorage.removeItem(chaveTeste);
      return true;
    } catch {
      return false;
    }
  }
}
