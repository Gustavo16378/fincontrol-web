/** Formato de erro devolvido pela API (e usado para exibir mensagem inline). */
export interface ErroApi {
  /** Status HTTP, ou 0 quando a requisição nem chegou ao servidor. */
  status: number;
  /** Mensagem já pronta para exibição ao usuário, em português. */
  mensagem: string;
  /** Erros por campo, quando a API devolve validação detalhada. */
  campos?: Record<string, string>;
}
