export type ICredencialGoogle = {
  id: number;
  code_response: {
    code: string;
    scope?: string;
    authuser?: string;
    prompt?: string;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    id_token: string;
    expiry_date: number;
  };
  expiracao_token: string;
  situacao?: number;
  criado_em: string;
};
