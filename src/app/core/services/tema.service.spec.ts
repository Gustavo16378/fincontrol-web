import { TestBed } from '@angular/core/testing';

import { ServicoTema } from './tema.service';

describe('ServicoTema', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    TestBed.configureTestingModule({});
  });

  it('aplica a classe do tema no elemento raiz', () => {
    const servico = TestBed.inject(ServicoTema);
    TestBed.tick();

    const classe = servico.estaEscuro() ? 'theme-dark' : 'theme-light';
    expect(document.documentElement.classList.contains(classe)).toBe(true);
  });

  it('alterna entre claro e escuro e persiste a escolha', () => {
    const servico = TestBed.inject(ServicoTema);
    const inicial = servico.tema();

    servico.alternar();
    TestBed.tick();

    expect(servico.tema()).not.toBe(inicial);
    expect(localStorage.getItem('fincontrol.tema')).toBe(servico.tema());
    expect(document.documentElement.classList.contains(`theme-${servico.tema()}`)).toBe(true);
  });
});
