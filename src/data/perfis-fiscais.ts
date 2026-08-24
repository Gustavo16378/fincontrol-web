import type { AtividadeMei, PerfilFiscal } from '@core/models';
import type { NomeIcone } from './icones';

export interface OpcaoPerfilFiscal {
  readonly valor: PerfilFiscal;
  readonly rotulo: string;
  readonly descricao: string;
  readonly icone: NomeIcone;
}

/** Cards clicáveis do cadastro. */
export const PERFIS_FISCAIS: readonly OpcaoPerfilFiscal[] = [
  {
    valor: 'PESSOA_FISICA',
    rotulo: 'Pessoa Física',
    descricao: 'Controle das finanças pessoais, sem obrigações de empresa.',
    icone: 'pessoaFisica',
  },
  {
    valor: 'MEI',
    rotulo: 'MEI',
    descricao: 'Microempreendedor: acompanhe DAS mensal e o limite de faturamento.',
    icone: 'loja',
  },
  {
    valor: 'ME',
    rotulo: 'ME',
    descricao: 'Microempresa no Simples Nacional, com faturamento por competência.',
    icone: 'empresa',
  },
];

export interface OpcaoAtividadeMei {
  readonly valor: AtividadeMei;
  readonly rotulo: string;
  readonly icone: NomeIcone;
}

/** Só aparece quando o perfil escolhido é MEI. */
export const ATIVIDADES_MEI: readonly OpcaoAtividadeMei[] = [
  { valor: 'COMERCIO', rotulo: 'Comércio', icone: 'comercio' },
  { valor: 'SERVICOS', rotulo: 'Serviços', icone: 'servicos' },
  { valor: 'AMBOS', rotulo: 'Ambos', icone: 'ambos' },
];

/** Rótulo curto do perfil, para exibir no header e no perfil do usuário. */
export const ROTULO_PERFIL_FISCAL: Record<PerfilFiscal, string> = {
  PESSOA_FISICA: 'Pessoa Física',
  MEI: 'MEI',
  ME: 'ME',
};
