import { validaParametros, validaRespostaRequisicao } from "@helpers/utils";
import { Request, Response } from "express";
import { EstadoValidator, EstadoValidatorEditar, EstadoValidatorFind } from "./validacao_dados";
import Estado from "@models/estado";
import ibge from "@api/api_ibge";
import HelperEstado from "@helpers/estado";
import EnderecoController from "../endereco_controller";

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

export default class EstadoController extends EnderecoController {

  public async criarEstado(req: Request, res: Response): Promise<Response> {
    try {
      const estado: EstadoValidator = await validaParametros<EstadoValidator, any>(EstadoValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      const estadoExistente: Estado = await this.obtemEstado(estado.ibgeId);

      if (estadoExistente)
        throw new Error(`O estado ${estado.nome} IBGEID: ${estado.ibgeId} Já existe cadastrado.`);

      // ------------------------------------------------------------------------------------------------------

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

  public async atualizaEstado(req: Request, res: Response): Promise<Response> {
    try {
      const estado: EstadoValidatorEditar = await validaParametros<EstadoValidatorEditar, any>(EstadoValidatorEditar, req.body);

      //---------------------------------------------------------------------------------------------------------------------------

      const estadoExistente: Estado = await this.obtemEstado(estado.ibgeId, estado.id);

      if (!estadoExistente)
        throw new Error(`O estado ${estado.nome} IBGEID: ${estado.ibgeId} ID: ${estado.id} não existe cadastrado.`);

      //---------------------------------------------------------------------------------------------------------------------------

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

      //---------------------------------------------------------------------------------------------------------------------------

      const estadoAtualizar: Estado = new Estado();
      estadoAtualizar.nome   = estado.nome;
      estadoAtualizar.uf     = estado.uf;
      estadoAtualizar.id     = estado.id;
      estadoAtualizar.ibgeId = estado.ibgeId;

      await (new HelperEstado()).atualizarEstado(estadoAtualizar);

      //---------------------------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Estado atualzado com sucesso!"
      });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async buscaEstado(req: Request, res: Response): Promise<Response> {
    try {
      const estado: EstadoValidatorFind = await validaParametros<EstadoValidatorFind, any>(EstadoValidatorFind, req.query);

      const estadoFind: Estado = new Estado();

      estadoFind.id     = Number(estado.id);
      estadoFind.ibgeId = Number(estado.ibgeId);
      estadoFind.nome   = estado.nome;
      estadoFind.uf     = estado.uf;

      const estados: Estado[] = await this.listaEstados(estadoFind);

      return res.status(200).json({ estados });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}