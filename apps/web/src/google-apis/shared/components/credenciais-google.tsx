"use client";

import { useEffect, useState } from "react";
import { useGoogleApi } from "../../google-apis.context";
import { ICredencialGoogle } from "../../../@types/credenciais-google.type";
import { CredencialGoogleApi } from "../../../http/credencial-google.api";

export function CredenciaisGoogle() {
  return (
    <div className="flex flex-col gap-4">
      <LoginButton />

      <Table />
    </div>
  );
}

function LoginButton() {
  const { authGoogle } = useGoogleApi();

  return (
    <div className="flex justify-end gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
        onClick={authGoogle}
      >
        Novo Login Google
      </button>
      <button id="signout_button">Sign Out</button>
    </div>
  );
}

function Table() {
  const [codeClientResponses, setCodeClientResponses] = useState<
    ICredencialGoogle[]
  >([]);

  function handleClick(codeClientResponse: ICredencialGoogle) {
    console.log("handleClick", codeClientResponse);
  }

  async function findAll() {
    const data = await CredencialGoogleApi.findAll();

    setCodeClientResponses(data);
  }

  function handleOnClickCode(credencialGoogle: ICredencialGoogle) {
    navigator.clipboard.writeText(
      JSON.stringify(credencialGoogle.code_response, null, 4),
    );
  }

  useEffect(() => {
    findAll();
  }, []);

  return (
    <div className="relative overflow-x-auto flex-grow">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-1">id</th>
            <th className="px-2 py-1">response</th>
            <th className="px-2 py-1">situacao</th>
            <th className="px-2 py-1">criado_em</th>
            <th className="px-2 py-1">acao</th>
          </tr>
        </thead>
        <tbody>
          {codeClientResponses.map((item) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id}
                </th>
                <td
                  className="px-2 py-1 cursor-pointer"
                  onClick={() => handleOnClickCode(item)}
                >
                  {item.code_response.code.slice(0, 15)}...
                </td>
                <td className="px-2 py-1">{item.situacao}</td>
                <td className="px-2 py-1">{item.criado_em}</td>
                <td className="px-2 py-1">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                    onClick={() => handleClick(item)}
                  >
                    Login Back
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
