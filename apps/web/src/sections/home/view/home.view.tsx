"use client";

import { GetEmailsButton } from "../../../google-apis/shared/components/get-emails-button";
import { CredenciaisGoogle } from "../../../google-apis/shared/components/credenciais-google";
import { SendEmailButton } from "../../../google-apis/shared/components/send-email-button";

export function HomeView() {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", gap: 10, margin: 12 }}
    >
      <CredenciaisGoogle />

      <SendEmailButton />

      <div>
        <GetEmailsButton />
      </div>
    </main>
  );
}
