"use client";
// react
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useGoogleScripts } from "./hooks/use-google-scripts";
import { ResponseGoogleAuth } from "./google-apis.type";
import { CredencialGoogleApi } from "../http/credencial-google.api";

// types

type ProviderProps = {
  children: ReactNode;
};

type ContextData = {
  authGoogle: VoidFunction;
};

export const GoogleApisContext = createContext<ContextData>({} as ContextData);

export function GoogleApisProvider({ children }: ProviderProps) {
  let tokenClient: google.accounts.oauth2.CodeClient | null = null;

  const { loadScripts, removeScripts } = useGoogleScripts({
    onChangeToken: handleOnChangeToken,
    async callbackRequestCode(codeResponse) {
      console.log("[initCodeClient CB]", codeResponse);

      if (codeResponse.error) {
        console.error(codeResponse);
        return;
      }

      const payload = { code: codeResponse.code };

      await CredencialGoogleApi.create(payload);
    },
  });

  function handleOnChangeToken(googleTokenClient: any) {
    tokenClient = googleTokenClient;
  }

  function handleAuthClick() {
    if (!tokenClient) return;

    tokenClient.requestCode();
  }

  useEffect(() => {
    loadScripts();

    return () => {
      removeScripts();
    };
  }, []);

  return (
    <GoogleApisContext.Provider value={{ authGoogle: handleAuthClick }}>
      {children}
    </GoogleApisContext.Provider>
  );
}

export function useGoogleApi() {
  const context = useContext(GoogleApisContext);

  if (!context) throw new Error("context must be use inside provider");

  return context;
}
