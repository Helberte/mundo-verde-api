import { Request, Response } from "express";
import RecursosHumanosController from "../recursos_humanos_controller";
import { EnderecoPessoaValidator, PessoaValidator, PessoaValidatorFind } from "./validacao_dados";
import { limpaFormatacaoCEP, limpaFormatacaoNumeros, retornaDiferencaObjetos, validaParametros } from "@helpers/utils";
import Pessoa from "@models/pessoa";
import HelperOpcoes, { EnumGruposOpcoes } from "@helpers/opcoes";
import moment from "moment";
import { Transaction } from "sequelize";
import HelperPessoa from "@helpers/pessoa";
import PessoaEndereco from "@models/pessoa_endereco";
import HelperEstado from "@helpers/estado";
import Estado from "@models/estado";
import Cidade from "@models/cidade";
import HelperCidade from "@helpers/cidade";
import Bairro from "@models/bairro";
import HelperBairro from "@helpers/bairro";
import Endereco from "@models/endereco";
import HelperEndereco from "@helpers/endereco";

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

  public async buscaPessoas(req: Request, res: Response): Promise<Response> {
    try {
      const pessoa: PessoaValidatorFind = await validaParametros<PessoaValidatorFind, any>(PessoaValidatorFind, req.query);

      const pessoaFind: Pessoa = new Pessoa();

      pessoaFind.id             = Number(pessoa.id?.trim());
      pessoaFind.nome           = pessoa.nome?.trim();
      pessoaFind.sobrenome      = pessoa.sobrenome?.trim();
      pessoaFind.cpf            = pessoa.cpf?.trim();
      pessoaFind.dataNascimento = pessoa.dataNascimento ? moment(pessoa.dataNascimento?.trim(), "YYYY-MM-DD") : undefined;
      pessoaFind.opcoesSexoId   = Number(pessoa.opcoesSexoId?.trim());
      pessoaFind.email          = pessoa.email?.trim();
      pessoaFind.telefone1      = pessoa.telefone1?.trim();
      pessoaFind.telefone2      = pessoa.telefone2?.trim();
      pessoaFind.rg             = pessoa.rg?.trim();

      const pessoas: Pessoa[] = await this.listaPessoas(pessoaFind);

      return res.status(200).json({ pessoas });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async adicionaEnderecoPessoa(req: Request, res: Response): Promise<Response> {
    try {
      const dados: EnderecoPessoaValidator = await validaParametros<EnderecoPessoaValidator, any>(EnderecoPessoaValidator, req.body);
      let enderecoRetornar:   PessoaEndereco;
      let objetoUpdate:       any     = { };
      let enderecoAtualizado: boolean = false;
      let mensagem:           string  = "";

      // verificar se a pessoa existe
      let pessoaExistente: Pessoa = await this.obtemPessoa(undefined, dados.pessoaId);

      if (!pessoaExistente)
        throw new Error(`A pessoa informada, não existe cadastrada. ID: ${dados.pessoaId}`);

      // verificar se a pessoa possui endereco
      const enderecoPessoa: Endereco = await this.buscaEnderecoPessoa(dados.pessoaId) as Endereco;

      // se possuir endereço, e não tiver liberado, retornar que precisa de liberação para atualizar o endereço existente
      if (!dados.liberacao && enderecoPessoa)
        throw new Error("Esta pessoa já possui endereço, para atualizar será necessário uma liberação. <br>" +
          "<br>Deseja Continuar?");

      // opcoes
      // ------------------------------------------------------------------------------------------------------

      const tipoEndereco: string = await new HelperOpcoes().obtemOpcao(EnumGruposOpcoes.TiposEndereco, dados.opcoesTipoId);

      if (!tipoEndereco)
        throw new Error("O Tipo do endereço informado está cadastrado!");

      // estado
      // ------------------------------------------------------------------------------------------------------

      const estado: Estado = await new HelperEstado().obtemEstado(undefined, dados.estadoId);

      if (!estado)
        throw new Error("O Estado informado não está cadastrado!");

      // cidade
      // ------------------------------------------------------------------------------------------------------

      const cidade: Cidade = await new HelperCidade().obtemCidade(undefined, dados.cidadeId);

      if (!cidade)
        throw new Error("A Cidade informada não está cadastrada!");

      // bairro
      // ------------------------------------------------------------------------------------------------------

      const bairro: Bairro = await new HelperBairro().obtemBairro(dados.bairroId, undefined, cidade.id);

      if (!bairro)
        throw new Error("O Bairro informado não existe cadastrado ou não pertence a esta cidade!");

      // ------------------------------------------------------------------------------------------------------

      const endereco: Endereco = new Endereco();

      endereco.rua          = dados.rua         ? dados.rua.trim()         : null;
      endereco.numero       = dados.numero      ? dados.numero.trim()      : null;
      endereco.observacao   = dados.observacao  ? dados.observacao.trim()  : null;
      endereco.complemento  = dados.complemento ? dados.complemento.trim() : null;
      endereco.cep          = limpaFormatacaoCEP(dados.cep) ? limpaFormatacaoCEP(dados.cep) : null;
      endereco.opcoesTipoId = dados.opcoesTipoId;
      endereco.bairroId     = dados.bairroId;
      endereco.cidadeId     = dados.cidadeId;
      endereco.estadoId     = dados.estadoId;

      // se o endereço já existe, tenta atualizar somente as propriedades alteradas
      if (enderecoPessoa) {
        objetoUpdate = retornaDiferencaObjetos(enderecoPessoa.dataValues, endereco.dataValues)

        if (Object.keys(objetoUpdate).length > 0) {
          await this.db().transaction(async (transaction: Transaction)=> {
              enderecoAtualizado = await new HelperEndereco().atualizaEnderecoExistente(enderecoPessoa, objetoUpdate, transaction);
          });
        }
      } else {
        await this.db().transaction(async (transaction: Transaction)=> {
          await this.insereEnderecoPessoa(endereco, dados.pessoaId, transaction);
        });
      }

      // ------------------------------------------------------------------------------------------------------
      // define a mensagem a ser retornada ao usuário

      mensagem = "Endereço inserido com sucesso!";

      if (enderecoPessoa && Object.keys(objetoUpdate).length > 0) {
        mensagem = "Endereço atualizado com sucesso!";
      } else if (enderecoPessoa && Object.keys(objetoUpdate).length <= 0) {
        mensagem = "Nenhuma informação foi atualizada!";
      }

      // ------------------------------------------------------------------------------------------------------

      enderecoRetornar = await this.buscaEnderecoPessoa(dados.pessoaId, true) as PessoaEndereco;

      return res.status(200).json({
        mensagem,
        enderecoAtualizado,
        pessoaEndereco: { ...enderecoRetornar.dataValues }
      });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}