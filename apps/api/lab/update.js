const { knex } = require('knex');
const { pg } = require('../knexfile');

const knexConnection = knex(pg);

const tokens = {
  access_token:
    'ya29.a0AcM612xQXPGZ8JRjb_PYqJg0eXs-0AlakDXnUDbslBfWDo3gA0QRfEzDbi76Ma0hfa2bM9d4YmujOJR1olS8llYzFKQmE4dzy3YzpADCDjKAA6-fOCkYyeL2yOsG-0B5Y68cq1lGKUHMZGd9QCIyaPCetIKLOrdXX3eC8K9waCgYKAX8SARMSFQHGX2MivLOvKYKZU-sh0J0YXJyOHw0175',
  scope:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly openid https://www.googleapis.com/auth/pubsub https://mail.google.com/',
  token_type: 'Bearer',
  id_token:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZjgwYzYzNDYwMGVkMTMwNzIxMDFhOGI0MjIwNDQzNDMzZGIyODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODkzODQwOTI5MjgtYzFwNTlpaDgzcW9mcWIzZTlsNHYwOGpwb3I4bGg0amMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODkzODQwOTI5MjgtYzFwNTlpaDgzcW9mcWIzZTlsNHYwOGpwb3I4bGg0amMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ1ODQ0MDYzNzE4MDgzMzUzMzEiLCJlbWFpbCI6ImVzdGV2YW9ibHZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJQUGJaWDliZndaVWVURXJ6SE5OcW5nIiwiaWF0IjoxNzI1NTcxNzI4LCJleHAiOjE3MjU1NzUzMjh9.keClLMBr7j5J156tVIk-Lv3DYvnkMFwPydKbGCB9tDtD0OK2HycJaU2eEh7e2JFFuxiPULHXkldqFUXnJchwUPRaFgtMqzqwLfbvpUZIXOZvq0uw_eYacoVU6e1S1UNlw2RXKvQNOmUSAtJ3XQd1zRDKUteEJW7Le1HA9c0rt_-ranW9cSXt_fxhO__1DD6nun8ozbt5nvnUS-Oqyk2I5jeb77W0z5ix2-hHwKuqI4fAUXK0cPCm1-wpoAsVHXCZlBWJFa4i6XdCVreR4eXS8Jx55clM7EO74AD7oFI3kmtvTYRZQKG8bndmoEwr6y3KlTTS5RAvj6hxsTvPx8h1QQ',
  expiry_date: 1725575403062,
  refresh_token:
    '1//0hL6pMAaYz2BpCgYIARAAGBESNwF-L9IrNYfWHZ235c-qx_VTVDBZepu39a46yWQonZBocvLlbomYJG1aIYbkQipqQoLGNL4qWyQ',
};

async function update() {
  const googlecredentials = await knexConnection
    .select('*')
    .from('credenciais_google')
    .first();

  await knexConnection('credenciais_google')
    .update('tokens', tokens)
    .where('id', googlecredentials.id);
}

update().finally(async () => {
  await knexConnection.destroy();
});
