import { ICredencialGoogle } from "../@types/credenciais-google.type";
import { api } from "./api";

type ICreateCredencial = {
  code: string;
};

export const CredencialGoogleApi = {
  async create(createData: ICreateCredencial) {
    await api.post("google/credenciais", createData);
  },

  async findAll() {
    const { data } = await api.get<ICredencialGoogle[]>("google/credenciais");

    return data;
  },
};
