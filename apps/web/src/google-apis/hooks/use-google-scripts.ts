"use client";

import {
  loadScriptGoogleJsApi,
  loadScriptGsi,
  removeGoogleScripts,
} from "./load-google-scripts.helpers";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChangeToken: (tokenClient: any) => void;
  callbackRequestCode: (response: google.accounts.oauth2.CodeResponse) => void;
};

export function useGoogleScripts({
  onChangeToken,
  callbackRequestCode,
}: Props) {
  let gapiInited = false;
  let gisInited = false;

  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const SCOPES = [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/pubsub",
  ].join(" ");

  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";

  function loadScripts() {
    loadScriptGsi(gsiLoaded);
    loadScriptGoogleJsApi(gapiLoaded);
  }

  function gsiLoaded() {
    gisInited = true;

    // eslint-disable-next-line no-undef
    const tokenClient = google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID as string,
      scope: SCOPES,
      ux_mode: "popup",
      redirect_uri: "http://localhost:4333/redirect-login",
      callback: callbackRequestCode,
    });

    console.log("gsiLoaded", {
      url_redirect: "http://localhost:4333/redirect-login",
      tokenClient,
    });

    onChangeToken(tokenClient);
  }

  function gapiLoaded() {
    window.gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  }

  return {
    loadScripts,
    removeScripts: removeGoogleScripts,
    gapiInited,
    gisInited,
  };
}
