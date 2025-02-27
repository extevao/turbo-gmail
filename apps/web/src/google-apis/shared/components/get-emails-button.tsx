"use client";

import { useState } from "react";

export function GetEmailsButton() {
  const [email, setEmail] = useState<any | null>(null);

  async function handleClick() {
    console.log("handleClick");

    if (!window.gapi) return;

    const response = await window.gapi.client.gmail.users.messages.list({
      userId: "me", // 'me' refere-se ao usuário autenticado
      labelIds: "INBOX", // Filtro para a caixa de entrada
      maxResults: 10, // Número máximo de resultados
    });

    console.log(response);

    if (response.result.messages && response.result.messages.length) {
      let numeroAleatorio = Math.floor(
        Math.random() * response.result.messages.length + 1,
      );

      const mensagem = response.result.messages[numeroAleatorio];

      // getEmail(mensagem);
    }
  }

  async function getEmail(message: { id: string }) {
    if (!window.gapi) return;
    if (!message) return;

    const response = await window.gapi.client.gmail.users.messages.get({
      userId: "me", // 'me' refere-se ao usuário autenticado
      id: message.id, // ID da mensagem que você deseja obter
    });

    console.log("getEmail", response);
    if (response.result.payload && response.result.payload.parts?.length) {
      // setEmail(response.result.payload.parts[0].body.data);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Get Email
      </button>

      {email && <EmailViewer base64Html={email} />}
    </div>
  );
}

function EmailViewer({ base64Html }: { base64Html: string }) {
  // Decodifica a string Base64 para HTML

  function decodeBase64() {
    // Substitui os caracteres "-" e "_" pelos seus equivalentes "+" e "/"
    const base64 = base64Html.replace(/-/g, "+").replace(/_/g, "/");

    // Decodifica a string base64 para um array de bytes (Uint8Array)
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Decodifica o array de bytes para uma string UTF-8
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(bytes);
  }

  return <div dangerouslySetInnerHTML={{ __html: decodeBase64() }} />;
}
