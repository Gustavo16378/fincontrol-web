import { MoedaBrPipe } from './moeda-br.pipe';

/** O Intl separa símbolo e número com espaço não separável; normalizamos. */
const normalizar = (valor: string) => valor.replace(/\s/g, ' ');

describe('MoedaBrPipe', () => {
  const pipe = new MoedaBrPipe();

  it('formata número em real brasileiro', () => {
    expect(normalizar(pipe.transform(1234.5))).toBe('R$ 1.234,50');
  });

  it('formata negativo mantendo duas casas', () => {
    expect(normalizar(pipe.transform(-42))).toBe('-R$ 42,00');
  });

  it('trata nulo como zero', () => {
    expect(normalizar(pipe.transform(null))).toBe('R$ 0,00');
  });

  it('omite o símbolo quando pedido', () => {
    expect(normalizar(pipe.transform(1234.5, false))).toBe('1.234,50');
  });
});
