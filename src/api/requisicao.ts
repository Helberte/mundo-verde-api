import axios, { AxiosResponse } from "axios";

class Requisicao {

  async get<T>(endPoint: string) : Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(endPoint);
    } catch (error) {
      throw new Error("Erro ao realizar requisição.")
    }
  }
}

export default new Requisicao;