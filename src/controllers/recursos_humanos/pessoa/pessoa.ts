import { Request, Response } from "express";
import RecursosHumanosController from "../pessoa_controller";
import { PessoaValidator } from "./validacao_dados";
import { validaParametros } from "@helpers/utils";

export default class PessoaController extends RecursosHumanosController {

  public async criarPessoa(req: Request, res: Response): Promise<Response> {
    try {
      const pessoa: PessoaValidator = await validaParametros<PessoaValidator, any>(PessoaValidator, req.body);

      return res.status(200).json({
        mensagem: "Cadastro da pessoa criado com sucesso!",
        pessoa
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}