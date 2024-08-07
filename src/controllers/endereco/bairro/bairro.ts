import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import EnderecoController from "../endereco_controller";
import { BairroValidator, BairroValidatorFind } from "./validacao_dados";
import Bairro from "@models/bairro";
import Cidade from "@models/cidade";
import HelperBairro from "@helpers/bairro";
import HelperCidade from "@helpers/cidade";

export default class BairroController extends EnderecoController {

  public async criarBairro(req: Request, res: Response): Promise<Response> {
    try {
      const bairro: BairroValidator = await validaParametros<BairroValidator, any>(BairroValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      const cidade: Cidade = await new HelperCidade().obtemCidade(undefined, bairro.cidadeId);

      if (!cidade)
        throw new Error("A cidade fornecida não existe cadastrada, cadastre-a antes e posteriormente forneça bairros a ela.");

      const bairroExistente: Bairro = await new HelperBairro().obtemBairro(undefined, bairro.nome, bairro.cidadeId);

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

  public async buscaBairro(req: Request, res: Response): Promise<Response> {
    try {
      const bairro: BairroValidatorFind = await validaParametros<BairroValidatorFind, any>(BairroValidatorFind, req.query);

      const bairroFind: Bairro = new Bairro();

      bairroFind.nome     = bairro.nome;
      bairroFind.id       = Number(bairro.id);
      bairroFind.cidadeId = Number(bairro.cidadeId);

      const bairros: Bairro[] = await this.listaBairros(bairroFind);

      return res.status(200).json({ bairros });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}