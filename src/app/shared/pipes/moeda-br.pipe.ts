import { Pipe, PipeTransform } from '@angular/core';

import { formatarMoedaBr } from '@core/utils/formato';

/**
 * `{{ 1234.5 | moedaBr }}` → `R$ 1.234,50`
 * `{{ 1234.5 | moedaBr: false }}` → `1.234,50`
 *
 * Único caminho para exibir dinheiro no app — sempre com `tabular-nums`
 * na classe do elemento (`.valor-monetario`).
 */
@Pipe({ name: 'moedaBr' })
export class MoedaBrPipe implements PipeTransform {
  transform(valor: number | string | null | undefined, comSimbolo = true): string {
    return formatarMoedaBr(valor, comSimbolo);
  }
}
