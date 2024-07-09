import { Request, Response } from "express";
import RecursosHumanosController from "../pessoa_controller";
import { PessoaValidator } from "./validacao_dados";
import { limpaFormatacaoNumeros, validaParametros } from "@helpers/utils";
import Pessoa from "@models/pessoa";
import HelperOpcoes, { EnumGruposOpcoes } from "@helpers/opcoes";
import moment from "moment";
import { Transaction } from "sequelize";
import HelperPessoa from "@helpers/pessoa";

export default class PessoaController extends RecursosHumanosController {

  public async criarPessoa(req: Request, res: Response): Promise<Response> {
    try {
      const pessoa: PessoaValidator = await validaParametros<PessoaValidator, any>(PessoaValidator, req.body);
      let pessoaIdInserida: number  = 0;

      // Depois da parte da validacao do usuário, inserir a pessoa na empresa na qual o usuário que chamou esta rota
      // está logado

      // verificar se existe pessoa com mesmo cpf
      // --------------------------------------------------------------------------------------------------------------
      const pessoaExistente: Pessoa = await this.obtemPessoa(pessoa.cpf);

      if (pessoaExistente)
        throw new Error("Este CPF já está em uso.");

      // verificar se a opção do sexo da pessoa existe cadastrada
      // --------------------------------------------------------------------------------------------------------------
      const sexo: string = await new HelperOpcoes().obtemOpcao(EnumGruposOpcoes.SexoPessoas, pessoa.opcoesSexoId);

      if (!sexo)
        throw new Error("O sexo informado não existe cadastrado!");

      // fazer a insersão da pessoa
      // --------------------------------------------------------------------------------------------------------------
      const novaPessoa: Pessoa = new Pessoa();

      novaPessoa.nome           = pessoa.nome.toUpperCase().trim();
      novaPessoa.sobrenome      = pessoa.sobrenome.toUpperCase().trim();
      novaPessoa.cpf            = limpaFormatacaoNumeros(pessoa.cpf);
      novaPessoa.dataNascimento = moment(pessoa.dataNascimento).utcOffset(0, true); // remove o utc -04:00
      novaPessoa.opcoesSexoId   = pessoa.opcoesSexoId;
      novaPessoa.email          = pessoa.email?.trim() ? pessoa.email.trim() : null;
      novaPessoa.telefone1      = limpaFormatacaoNumeros(pessoa.telefone1) ? limpaFormatacaoNumeros(pessoa.telefone1) : null;
      novaPessoa.telefone2      = limpaFormatacaoNumeros(pessoa.telefone2) ? limpaFormatacaoNumeros(pessoa.telefone2) : null;
      novaPessoa.rg             = limpaFormatacaoNumeros(pessoa.rg)        ? limpaFormatacaoNumeros(pessoa.rg)        : null;

      // fazer a insersão da pessoa cadastrada na empresa onde ela irá pertencer

      await this.db().transaction( async (transaction: Transaction) => {
        pessoaIdInserida = (await new HelperPessoa().inserePessoa(novaPessoa, transaction)).id;

        if (pessoaIdInserida === 0)
          throw new Error("Erro ao inserir pessoa.");

        await this.inserePessoaEmpresa(2, pessoaIdInserida, transaction);
      });

      // --------------------------------------------------------------------------------------------------------------

      return res.status(200).json({ mensagem: "Cadastro da pessoa criado com sucesso!" });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}