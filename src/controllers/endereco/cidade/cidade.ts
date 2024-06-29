import { validaParametros, validaRespostaRequisicao } from "@helpers/utils";
import { Request, Response } from "express";
import Estado from "@models/estado";
import ibge from "@api/api_ibge";
import EnderecoController from "../endereco_controller";
import { CidadeValidator, CidadeValidatorFind } from "./validacao_dados";
import Cidade from "@models/cidade";
import HelperCidade from "@helpers/cidade";

interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

interface UF {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

interface Mesorregiao {
  id: number;
  nome: string;
  UF: UF;
}

interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

interface CidadeIbge {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
}

export default class CidadeController extends EnderecoController {

  public async criarCidade(req: Request, res: Response): Promise<Response> {
    try {
      const cidade: CidadeValidator = await validaParametros<CidadeValidator, any>(CidadeValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      const cidadeExistente: Cidade = await this.obtemCidade(cidade.ibgeId);

      if (cidadeExistente)
        throw new Error(`A Cidade ${cidade.nome} IBGEID: ${cidade.ibgeId} Já existe cadastrada.`);

      // ------------------------------------------------------------------------------------------------------

      // consultar o ibgeid na api do ibge para ver se de fato a cidade existe
      const cidadeIBGE: CidadeIbge = await ibge.obterMunicipio<CidadeIbge>(cidade.ibgeId);

      if (!validaRespostaRequisicao(cidadeIBGE))
        throw new Error(`Cidade: ${cidade.nome} IBGEID: ${cidade.ibgeId} Inexistente para o IBGE.`)

      if (cidade.nome.toUpperCase().trim() !== cidadeIBGE.nome.toUpperCase().trim())
        throw new Error(`O nome da cidade informado não corresponde ao nome da cidade no qual pertence este IBGEID: ${cidade.ibgeId} ` +
          `Nome IBGE: ${cidadeIBGE.nome}`);

      // ------------------------------------------------------------------------------------------------------

      const estado: Estado = await this.obtemEstado(undefined, cidade.estadoId);

      if (!estado)
        throw new Error("O estado informado não existe na base interna de dados, cadastre-o e posteriormente tente inserir" +
          " cidades a ele.");

      if (estado.ibgeId !== cidadeIBGE.microrregiao.mesorregiao.UF.id)
        throw new Error("Esta cidade não pertence ao estado informado.");

      // ------------------------------------------------------------------------------------------------------

      // por fim, insere a cidade
      const novaCidade: Cidade = new Cidade();

      novaCidade.nome     = cidadeIBGE.nome;
      novaCidade.ibgeId   = cidadeIBGE.id;
      novaCidade.estadoId = estado.id;

      const retorno: Cidade = await (new HelperCidade()).insereCidade(novaCidade);

      // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Cidade inserida com sucesso!",
        cidade: retorno
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async buscaCidade(req: Request, res: Response): Promise<Response> {
    try {
      const cidade: CidadeValidatorFind = await validaParametros<CidadeValidatorFind, any>(CidadeValidatorFind, req.query);

      const cidadeFind: Cidade = new Cidade();

      cidadeFind.id       = Number(cidade.id);
      cidadeFind.ibgeId   = Number(cidade.ibgeId);
      cidadeFind.nome     = cidade.nome;
      cidadeFind.estadoId = cidade.estadoId;

      const cidades: Cidade[] = await this.listaCidades(cidadeFind);

      return res.status(200).json({ cidades });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}