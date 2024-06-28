import requisicao from "./requisicao";

class Ibge {

  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/";
  }

  async obterEstado<T>(ibgeId: number): Promise<T> {
    return (await requisicao.get<T>(this.baseUrl + "estados/" + String(ibgeId))).data;
  }
}

export default new Ibge;