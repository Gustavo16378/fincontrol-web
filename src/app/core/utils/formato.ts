/** Formatação centralizada — nenhum componente monta string de dinheiro sozinho. */

const FORMATADOR_MOEDA = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const FORMATADOR_MOEDA_SEM_SIMBOLO = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Converte um número para real brasileiro: `1234.5` → `R$ 1.234,50`.
 * Valores nulos ou não numéricos viram `R$ 0,00` (ou `0,00` sem símbolo).
 */
export function formatarMoedaBr(
  valor: number | string | null | undefined,
  comSimbolo = true,
): string {
  const numero = normalizar(valor);
  return comSimbolo ? FORMATADOR_MOEDA.format(numero) : FORMATADOR_MOEDA_SEM_SIMBOLO.format(numero);
}

function normalizar(valor: number | string | null | undefined): number {
  if (typeof valor === 'number') {
    return Number.isFinite(valor) ? valor : 0;
  }
  if (typeof valor === 'string' && valor.trim() !== '') {
    const numero = Number(valor.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(numero) ? numero : 0;
  }
  return 0;
}
