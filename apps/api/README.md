## Email sem parts

id: 191fbd5a4881d075

```JSON
{
  "payload": {
      "partId": "",
      "mimeType": "text/html",
      "filename": "",
      "headers": [],
      "body": {
          "size": 69,
          "data": "VXNlIHRoZSBvcHRpY2FsIEFHUCBwaXhlbCwgdGhlbiB5b3UgY2FuIGNvbm5lY3QgdGhlIG1vYmlsZSBjYXBhY2l0b3Ih"
      }
  }
}
```

## Credencial expirada

Usar para testar e tratar excecao de quando a sessao cair e tiver que pedir pro usuario nova credencial

```JSON
{
    "access_token": "ya29.a0AcM612w81LEIgvGqPDzEOKKVID_CB82sKqaOcLyy9I8w60KpL-QrWpBUcvrNtoX9HsbOhxgtjmTNTMYSvCK61BpGtciPOrIxz1PHCkwKpLOMFk8qJcpNQyqrG5S5XKtwWmTbjtZwexxABgv0FMvEngQ2lTjx3S2EK3CrTC42tgaCgYKAdISARMSFQHGX2MilWKNi_bS968FUySJO7brpg0177",
    "scope": "https://mail.google.com/ https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/pubsub https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly openid https://www.googleapis.com/auth/userinfo.email",
    "token_type": "Bearer",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ3YjkzOTc3MWE3ODAwYzQxM2Y5MDA1MTAxMmQ5NzU5ODE5MTZkNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODkzODQwOTI5MjgtYzFwNTlpaDgzcW9mcWIzZTlsNHYwOGpwb3I4bGg0amMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODkzODQwOTI5MjgtYzFwNTlpaDgzcW9mcWIzZTlsNHYwOGpwb3I4bGg0amMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ1ODQ0MDYzNzE4MDgzMzUzMzEiLCJlbWFpbCI6ImVzdGV2YW9ibHZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJFSHdEQ2liVzI3SEd4T1R2ZVBXeHRnIiwiaWF0IjoxNzI1OTc0ODY5LCJleHAiOjE3MjU5Nzg0Njl9.JwfOTayBMbngIVHC79k_XxuBDk_wrb9V9lfp2b2TMWTBqxniSCBxuGmlJ0gkb1o1NjIIWrlel2Z7qH6fHJWHY688lkKmoks3VzvxbHROl7HaAQXVXo7zbrAgVn_IK6Rbo9lshUqlCh5MOiTxNnpc8pa7yQnyCEudW0JEliauQpC5Y9yT5Bu9kQzsRY3JRbKQIXdjbmtgn_RpwIl-_27vOfwrUHU47Gs_RPaUmzOjEBr1mdZpUsPgAwgmpQlbtQZ7hhky-hrdVMmltUE3_Ai48QaNrwUWzGDpehUu4qdBENrUSrAe4nuCOqQCLROgD39izP_Hvg7VcEXnKVelw1WhVw",
    "expiry_date": 1725978549079,
    "refresh_token": "1//0hr8xewhIIj1jCgYIARAAGBESNwF-L9Iro3WdeUR8hAP5EO_gXYRPkotKy36fXuYvz9jIbuZSmvY7iq8juKopLmVtCFXEp-Lxmds"
}
```

## Response data sendMail

```JSON
{
    "id": "191fbd5a4881d075",
    "threadId": "191fbd5a4881d075",
    "labelIds": [
        "SENT"
    ]
}
```

LINKS:

https://brauliodavid.medium.com/using-gmail-api-with-node-js-and-typescript-3a228759985e
