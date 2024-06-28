import Controller from "@controllers/controller";
import { validaParametros, validaRespostaRequisicao } from "@helpers/utils";
import { Request, Response } from "express";
import { EstadoValidator } from "./validacao_dados";
import Estado from "@models/estado";
import ibge from "@api/api_ibge";
import HelperEstado from "@helpers/estado";

interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

interface EstadoIbge {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

export default class EstadoController extends Controller {

  public async criarEstado(req: Request, res: Response): Promise<Response> {
    try {
      const estado: EstadoValidator = await validaParametros<EstadoValidator, any>(EstadoValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      const estadoExistente: Estado = await Estado.findOne(
        {
          where:
          {
            ibgeId: estado.ibgeId
          }
        });

      // ------------------------------------------------------------------------------------------------------

      if (estadoExistente)
        throw new Error(`O estado ${estado.nome} IBGEID: ${estado.ibgeId} Já existe cadastrado.`);

      // consultar o ibgeid na api do ibge para ver se de fato o estado existe
      const estadoIBGE: EstadoIbge = await ibge.obterEstado<EstadoIbge>(estado.ibgeId);

      if (!validaRespostaRequisicao(estadoIBGE))
        throw new Error(`Estado: ${estado.nome} IBGEID: ${estado.ibgeId} Inexistente para o IBGE.`)

      if (estado.nome.toUpperCase().trim() !== estadoIBGE.nome.toUpperCase().trim())
        throw new Error(`O nome do estado informado não corresponde ao nome do estado no qual pertence este IBGEID: ${estado.ibgeId} ` +
          `Nome IBGE: ${estadoIBGE.nome}`);

      if (estado.uf.toUpperCase().trim() !== estadoIBGE.sigla.toUpperCase().trim())
        throw new Error(`O UF (sigla) do estado informado não corresponde ao UF (sigla) do estado no qual pertence este IBGEID: ${estado.ibgeId} ` +
          `UF (sigla) IBGE: ${estadoIBGE.sigla}`);

      // ------------------------------------------------------------------------------------------------------

      // por fim, insere o estado
      const novoEstado: Estado = new Estado();

      novoEstado.nome   = estadoIBGE.nome;
      novoEstado.uf     = estadoIBGE.sigla;
      novoEstado.ibgeId = estadoIBGE.id;

      const retorno: Estado = await (new HelperEstado()).insereEstado(novoEstado)

      // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Estado inserido com sucesso!",
        estado: retorno
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}