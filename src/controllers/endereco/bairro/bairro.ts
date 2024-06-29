import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import EnderecoController from "../endereco_controller";
import { BairroValidator } from "./validacao_dados";
import Bairro from "@models/bairro";
import Cidade from "@models/cidade";
import HelperBairro from "@helpers/bairro";

export default class BairroController extends EnderecoController {

  public async criarBairro(req: Request, res: Response): Promise<Response> {
    try {
      const bairro: BairroValidator = await validaParametros<BairroValidator, any>(BairroValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      const cidade: Cidade = await this.obtemCidade(undefined, bairro.cidadeId);

      if (!cidade)
        throw new Error("A cidade fornecida não existe cadastrada, cadastre-a antes e posteriormente forneça bairros a ela.");

      const bairroExistente: Bairro = await this.obtemBairro(undefined, bairro.nome, bairro.cidadeId);

      if (bairroExistente)
        throw new Error(`O Bairro ${bairro.nome} já existe cadastrado na cidade: ${cidade.nome}`);

      // ------------------------------------------------------------------------------------------------------

      // por fim, insere o bairro
      const novoBairro: Bairro = new Bairro();

      novoBairro.nome     = bairro.nome;
      novoBairro.cidadeId = bairro.cidadeId;

      const retorno: Bairro = await (new HelperBairro()).insereBairro(novoBairro);

      // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Bairro inserido com sucesso!",
        bairro: retorno
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
/*
  public async buscaBairro(req: Request, res: Response): Promise<Response> {
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
  }*/
}