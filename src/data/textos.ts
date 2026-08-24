/**
 * Todo o texto visível do FinControl.
 *
 * Regra do projeto: componente não hardcoda copy. Se um rótulo aparece na
 * tela, ele mora aqui (ou em `navegacao.ts` / `perfis-fiscais.ts`).
 */

export const TEXTOS = {
  marca: {
    nome: 'FinControl',
    assinatura: 'Suas finanças sob controle',
    descricao:
      'Controle de finanças pessoais com metas e módulo fiscal brasileiro: transações, recorrências, DAS do MEI e limites do Simples.',
  },

  comum: {
    carregando: 'Carregando…',
    salvando: 'Salvando…',
    cancelar: 'Cancelar',
    confirmar: 'Confirmar',
    fechar: 'Fechar',
    voltar: 'Voltar',
    tentarNovamente: 'Tentar novamente',
    obrigatorio: 'obrigatório',
    emConstrucao: 'Em construção',
    emConstrucaoDetalhe:
      'Esta área faz parte das próximas fases do FinControl. A navegação já está pronta.',
    mostrarSenha: 'Mostrar senha',
    ocultarSenha: 'Ocultar senha',
  },

  validacao: {
    obrigatorio: 'Campo obrigatório.',
    email: 'Informe um e-mail válido.',
    senhaCurta: 'A senha precisa de no mínimo 8 caracteres.',
    nomeCurto: 'Informe seu nome completo (mínimo 3 caracteres).',
    confirmacaoDivergente: 'As senhas não conferem.',
    perfilFiscal: 'Escolha um perfil fiscal.',
    atividadeMei: 'Escolha a atividade do seu MEI.',
  },

  erros: {
    semRede: 'Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.',
    naoAutorizado: 'Sua sessão expirou. Entre novamente para continuar.',
    credenciaisInvalidas: 'E-mail ou senha incorretos.',
    proibido: 'Você não tem permissão para acessar este recurso.',
    naoEncontrado: 'Não encontramos o que você procurava.',
    conflito: 'Este e-mail já está cadastrado.',
    servidor: 'Algo deu errado do nosso lado. Tente novamente em instantes.',
    generico: 'Não foi possível concluir a operação.',
  },

  auth: {
    login: {
      titulo: 'Entrar',
      subtitulo: 'Acesse sua conta para continuar.',
      email: 'E-mail',
      emailPlaceholder: 'voce@email.com',
      senha: 'Senha',
      senhaPlaceholder: 'Sua senha',
      enviar: 'Entrar',
      enviando: 'Entrando…',
      chamadaCadastro: 'Ainda não tem conta?',
      linkCadastro: 'Criar conta',
    },
    cadastro: {
      titulo: 'Criar conta',
      subtitulo: 'Leva menos de um minuto.',
      nome: 'Nome',
      nomePlaceholder: 'Seu nome completo',
      email: 'E-mail',
      emailPlaceholder: 'voce@email.com',
      senha: 'Senha',
      senhaPlaceholder: 'Mínimo de 8 caracteres',
      confirmacao: 'Confirmar senha',
      confirmacaoPlaceholder: 'Repita a senha',
      perfilFiscalTitulo: 'Perfil fiscal',
      perfilFiscalAjuda: 'Isso define quais recursos fiscais o FinControl vai te mostrar.',
      atividadeMeiTitulo: 'Atividade do MEI',
      atividadeMeiAjuda: 'Usamos para calcular o DAS e acompanhar o limite de faturamento.',
      enviar: 'Criar conta',
      enviando: 'Criando conta…',
      chamadaLogin: 'Já tem conta?',
      linkLogin: 'Entrar',
    },
  },

  layout: {
    abrirMenu: 'Abrir menu de navegação',
    fecharMenu: 'Fechar menu de navegação',
    navegacaoPrincipal: 'Navegação principal',
    menuMobile: 'Menu',
    pularParaConteudo: 'Pular para o conteúdo',
    conteudoPrincipal: 'Conteúdo principal',
    temaClaro: 'Ativar tema claro',
    temaEscuro: 'Ativar tema escuro',
    sair: 'Sair',
    sairConfirmacaoTitulo: 'Sair da conta?',
    sairConfirmacaoTexto: 'Você vai precisar entrar de novo para acessar seus dados.',
    saudacao: 'Olá',
    perfilFiscalRotulo: 'Perfil fiscal',
  },

  paginas: {
    dashboard: {
      titulo: 'Visão geral',
      resumo: 'Saldo do mês, entradas, saídas e o andamento das suas metas.',
    },
    transacoes: {
      titulo: 'Transações',
      resumo: 'Todos os lançamentos de entrada e saída, com filtros por período e categoria.',
    },
    metas: {
      titulo: 'Metas',
      resumo: 'Objetivos financeiros com valor-alvo, prazo e progresso acumulado.',
    },
    categorias: {
      titulo: 'Categorias',
      resumo: 'Como seus lançamentos são organizados e agrupados nos relatórios.',
    },
    recorrencias: {
      titulo: 'Recorrências',
      resumo: 'Contas fixas, assinaturas e lançamentos que se repetem todo mês.',
    },
    fiscal: {
      titulo: 'Fiscal',
      resumo: 'DAS do MEI, limite de faturamento e obrigações do seu perfil fiscal.',
    },
    perfil: {
      titulo: 'Perfil',
      resumo: 'Seus dados, perfil fiscal e preferências do aplicativo.',
    },
    naoEncontrada: {
      titulo: 'Página não encontrada',
      resumo: 'O endereço acessado não existe ou foi movido.',
      acao: 'Ir para a visão geral',
    },
  },
} as const;
