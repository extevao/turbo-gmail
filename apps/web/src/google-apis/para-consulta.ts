import { ResponseGoogleAuth } from "./google-apis.type";

let tokenClient: any = null;

function handleAuthIniTokenClient() {
  // essa implmentacao é a que usava a tokenClient = google.accounts.oauth2.initTokenClient
  if (!tokenClient) return;

  (tokenClient as any).callback = async (resp: ResponseGoogleAuth) => {
    if (resp.error !== undefined) {
      throw resp;
    }

    console.log("tokenClient.callback", resp);
  };

  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    (tokenClient as any).requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    (tokenClient as any).requestAccessToken({ prompt: "" });
  }
}

async function watchCaixaEmail() {
  console.log("watchCaixaEmail");
  if (!window.gapi) return;

  const stop = true;

  if (stop) {
    try {
      const response = await window.gapi.client.gmail.users.stop({
        userId: "me",
      });

      console.log(response);
    } catch (error: any) {
      console.error("Erro stop:", error);
    }

    return;
  }

  try {
    const response = await window.gapi.client.gmail.users.watch({
      userId: "me", // 'me' refere-se ao usuário autenticado
      resource: {
        labelIds: ["INBOX"], // Monitorar a caixa de entrada
        topicName: "projects/elevated-web-433914-c3/topics/MyTopic", // Substitua pelo ID do seu projeto e nome do tópico
      },
    });

    console.log("Watch configurado:", response.result);
  } catch (error: any) {
    console.error("Erro ao configurar o watch:", error.result.error.message);
  }
}

// const res = await gmail.users.history.list({
//   userId: 'me',
//   startHistoryId: startHistoryId,
//   // Adicione parâmetros conforme necessário, como `labelId`
// });
