# Issues

- Terminar configuracao do google para poder receber os emails
- Cron para diariamente revalidar o watch na caixa do gmail do usuario
- Criar templates de email, para que o usuario possa selecionar

## Caixa de entrada

- Receber emails novos via webhook nao por evento do pub/sub
  npx cloudflared tunnel --url http://localhost:4333
- Gravar emails recebidos na caixa de entrada
- Criar acompanhamento se o email for a resposta a email de um acompanhamento

## Caixa de saída

- Gravar emails enviados pelo hub na caixa de saida
