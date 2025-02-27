import { Knex } from 'knex';

declare global {
  interface ICredenciaisGoogle {
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
  }

  interface IEmail {
    id: number;
    assunto: string;
    para: string;
    mensagem: string;
    gmail_message_id: string;
    gmail_thread_id: string;
    tipo_mensagem: string;
    criado_em: string;
  }

  interface IGmailSendLog {
    id: number;
    request_data: any;
    response_data: any;
    id_email: number;
    criado_em: string;
  }

  interface IGmailLabelLog {
    id: number;
    nome: string;
    label: any;
    criado_em: string;
  }
}

declare module 'knex/types/tables' {
  interface Tables {
    // This is same as specifying `knex<User>('users')`
    credenciais_google: ICredenciaisGoogle;
    // For more advanced types, you can specify separate type
    // for base model, "insert" type and "update" type.
    // But first: notice that if you choose to use this,
    // the basic typing showed above can be ignored.
    // So, this is like specifying
    //    knex
    //    .insert<{ name: string }>({ name: 'name' })
    //    .into<{ name: string, id: number }>('users')
    credenciais_google_composite: Knex.CompositeTableType<
      // This interface will be used for return type and
      // `where`, `having` etc where full type is required
      ICredenciaisGoogle,
      // Specifying "insert" type will also make sure
      // data matches interface in full. Meaning
      // if interface is `{ a: string, b: string }`,
      // `insert({ a: '' })` will complain about missing fields.
      //
      // For example, this will require only "name" field when inserting
      // and make created_at and updated_at optional.
      // And "id" can't be provided at all.
      // Defaults to "base" type.
      Pick<ICredenciaisGoogle, 'code_response' | 'tokens' | 'expiracao_token'> &
        Partial<Pick<ICredenciaisGoogle, 'criado_em'>>,
      // This interface is used for "update()" calls.
      // As opposed to regular specifying interface only once,
      // when specifying separate update interface, user will be
      // required to match it  exactly. So it's recommended to
      // provide partial interfaces for "update". Unless you want to always
      // require some field (e.g., `Partial<User> & { updated_at: string }`
      // will allow updating any field for User but require updated_at to be
      // always provided as well.
      //
      // For example, this wil allow updating all fields except "id".
      // "id" will still be usable for `where` clauses so
      //      knex('users_composite')
      //      .update({ name: 'name2' })
      //      .where('id', 10)`
      // will still work.
      // Defaults to Partial "insert" type
      Partial<Omit<ICredenciaisGoogle, 'id'>>
    >;
    emails: IEmail;
    emails_composite: Knex.CompositeTableType<
      IEmail,
      Pick<
        IEmail,
        | 'assunto'
        | 'para'
        | 'mensagem'
        | 'gmail_message_id'
        | 'gmail_thread_id'
        | 'tipo_mensagem'
      > &
        Partial<Pick<IEmail, 'criado_em'>>,
      Partial<Omit<IEmail, 'id'>>
    >;

    gmail_sends_logs: IGmailSendLog;
    gmail_sends_logs_composite: Knex.CompositeTableType<
      IGmailSendLog,
      Pick<IGmailSendLog, 'request_data' | 'response_data' | 'id_email'> &
        Partial<Pick<IGmailSendLog, 'criado_em'>>,
      Partial<Omit<IGmailSendLog, 'id'>>
    >;

    gmail_labels: IGmailLabelLog;
    gmail_labels_composite: Knex.CompositeTableType<
      IGmailLabelLog,
      Pick<IGmailLabelLog, 'nome' | 'label'> &
        Partial<Pick<IGmailLabelLog, 'criado_em'>>,
      Partial<Omit<IGmailLabelLog, 'id'>>
    >;
  }
}
