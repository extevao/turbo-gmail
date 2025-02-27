"use client";

export function SendEmailButton() {
  async function handleSendEmailClick() {
    const subject = "Ola do TurboGmail Mundo!!";

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      "base64",
    )}?=`;

    const messageParts = [
      "From: Estevao TurboGmail <estevaoblv@gmail.com>",
      "To: estevao.vasques@bmlog.com.br, estevaovasques@hotmail.com",
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `Subject: ${utf8Subject}`,
      "",
      "Esta é uma mensagem para dizer olá!.",
      "Entao... <b>Hello!</b>, <b>Ola!</b>, <b>Opa!</b> ",
    ];

    const message = messageParts.join("\n");

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await window.gapi?.client.gmail.users.messages.send({
      userId: "me",
      resource: {
        raw: encodedMessage,
      },
    });

    console.log("handleSendEmailClick", res);
  }

  return (
    <div>
      <button type="button" onClick={handleSendEmailClick}>
        Enviar Email
      </button>
    </div>
  );
}
