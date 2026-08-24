import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { TEXTOS } from '@data/textos';

/** Aceita apenas e-mails com formato plausível (o servidor continua sendo a verdade). */
export const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export const TAMANHO_MINIMO_SENHA = 8;

/** Validador de e-mail próprio: mensagem única e regra explícita. */
export const emailValido: ValidatorFn = (controle: AbstractControl): ValidationErrors | null => {
  const valor = String(controle.value ?? '').trim();
  if (valor === '') {
    return null;
  }
  return PADRAO_EMAIL.test(valor) ? null : { emailInvalido: true };
};

/**
 * Validador de grupo: exige que confirmação e senha coincidam.
 * O erro é marcado no controle de confirmação, que é onde a mensagem aparece.
 */
export function senhasCoincidem(campoSenha: string, campoConfirmacao: string): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const senha = grupo.get(campoSenha);
    const confirmacao = grupo.get(campoConfirmacao);

    if (!senha || !confirmacao || !confirmacao.value) {
      return null;
    }

    const divergem = senha.value !== confirmacao.value;
    const errosAtuais = { ...(confirmacao.errors ?? {}) };

    if (divergem) {
      confirmacao.setErrors({ ...errosAtuais, senhasDivergentes: true });
    } else if (errosAtuais['senhasDivergentes']) {
      delete errosAtuais['senhasDivergentes'];
      confirmacao.setErrors(Object.keys(errosAtuais).length > 0 ? errosAtuais : null);
    }

    return null;
  };
}

/** Traduz o primeiro erro ativo de um controle para a copy do projeto. */
export function mensagemDeErro(controle: AbstractControl | null): string | null {
  if (!controle || !controle.errors || !(controle.touched || controle.dirty)) {
    return null;
  }

  const { validacao } = TEXTOS;
  const erros = controle.errors;

  if (erros['required']) {
    return validacao.obrigatorio;
  }
  if (erros['email'] || erros['emailInvalido']) {
    return validacao.email;
  }
  if (erros['senhasDivergentes']) {
    return validacao.confirmacaoDivergente;
  }
  if (erros['minlength']) {
    const minimo = (erros['minlength'] as { requiredLength: number }).requiredLength;
    return minimo >= TAMANHO_MINIMO_SENHA ? validacao.senhaCurta : validacao.nomeCurto;
  }
  if (erros['servidor']) {
    return String(erros['servidor']);
  }

  return validacao.obrigatorio;
}
