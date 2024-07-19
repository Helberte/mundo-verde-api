import { Request, Response } from "express";
import { UsuarioValidator } from "./validacao_dados";
import { validaParametros } from "@helpers/utils";
import Pessoa from "@models/pessoa";
import HelperPessoa from "@helpers/pessoa";
import ControleAcessoController from "@controle_acesso/controle_acesso_controller";
import Usuario from "@models/usuario";
import HelperUsuario from "@helpers/usuario";
import Empresa from "@models/empresa";
import HelperEmpresa from "@helpers/empresa";
import bcrypt from "bcrypt";
import { Transaction } from "sequelize";

export default class UsuarioController extends ControleAcessoController {

  public async criarUsuario(req: Request, res: Response): Promise<Response> {
    try {
      const usuario: UsuarioValidator    = await validaParametros<UsuarioValidator, any>(UsuarioValidator, req.body);
      const helperUsuario: HelperUsuario = new HelperUsuario();
      let   usuarioInserido: Usuario;

      // ------------------------------------------------------------------------------------------------------------
      // verificar se pessoa existe
      const pessoa: Pessoa = await this.obtemPessoa(undefined, usuario.pessoaId);

      if (!pessoa)
        throw new Error("A pessoa informada não existe cadastrada.");

      // ------------------------------------------------------------------------------------------------------------
      // verificar se a empresa passada por parametro existe
      const empresaUsuario: Empresa = await new HelperEmpresa().obtemEmpresa(undefined, usuario.empresaId);

      if (!empresaUsuario)
        throw new Error("A empresa informada não existe cadastrada.");

      // ------------------------------------------------------------------------------------------------------------
      // verificar se a pessoa tem acesso a empresa na qual se está isnerindo o usuário para ela
      const empresaPessoa: boolean = await new HelperPessoa().verificaPessoaEmpresa(usuario.empresaId, usuario.pessoaId, undefined);

      if (!empresaPessoa)
        throw new Error("A pessoa informada pra este usuário, não tem acesso a esta empresa.");

      // ------------------------------------------------------------------------------------------------------------
      // verificar se pessoa já possui usuário
      const usuarioPessoa: Usuario = await helperUsuario.obtemUsuarioPessoa(usuario.pessoaId);

      // se possuir usuário, verificar se ele está ativo ou inativo
      if (usuarioPessoa && usuarioPessoa.ativo.toUpperCase() == "S")
        throw new Error("Já existe um usuário cadastrado para esta pessoa!");
      else
      if (usuarioPessoa && usuarioPessoa.ativo.toUpperCase() == "N")
        throw new Error("Já existe um usuário Inativo cadastrado para esta pessoa!");

      // ------------------------------------------------------------------------------------------------------------
      // verificar se tem outro usuário com o mesmo login
      const usuarioLogin: Usuario = await helperUsuario.obtemUsuarioLoginNome(usuario.login);

      // se possuir usuário, verificar se ele está ativo ou inativo
      if (usuarioLogin && usuarioLogin.ativo.toUpperCase() == "S")
        throw new Error("Este login já está em uso.");
      else
      if (usuarioLogin && usuarioLogin.ativo.toUpperCase() == "N")
        throw new Error("Este login já está em uso por um usuário Inativo.");

      // ------------------------------------------------------------------------------------------------------------
      // verificar se tem outro usuário nesta empresa com mesmo nome
      const usuarioNome: Usuario = await helperUsuario.obtemUsuarioEmpresaNome(usuario.empresaId, undefined, usuario.nome);

      if (usuarioNome)
        throw new Error("Já Existe um usuário nesta empresa usando este mesmo nome.");

      // ------------------------------------------------------------------------------------------------------------
      // passa a senha do usuário por um hash com salt
      if (Number(process.env.BCRYPT_SALT_ROUND) < 1)
        throw new Error("Salt não definido nas variaveis de ambiente.");

      const senhaHash: string = await bcrypt.hash(usuario.senha, Number(process.env.BCRYPT_SALT_ROUND));

      // ------------------------------------------------------------------------------------------------------------
      // inserir usuário
      const novoUsuario: Usuario = new Usuario();
      novoUsuario.login    = usuario.login.trim();
      novoUsuario.senha    = senhaHash;
      novoUsuario.nome     = usuario.nome.trim();
      novoUsuario.ativo    = usuario.ativo;
      novoUsuario.pessoaId = usuario.pessoaId;

      await this.db().transaction(async (transaction: Transaction) => {

        usuarioInserido = await helperUsuario.insereUsuario(novoUsuario, transaction);

        await helperUsuario.insereUsuarioEmpresa(usuarioInserido.id, usuario.empresaId, transaction);
      });

      return res.status(200).json({
        mensagem: "Cadastro do usuário criado com sucesso!",
        usuario: usuarioInserido
      });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
/*
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

      if (cidade.estadoId != estado.id)
        throw new Error("Esta cidade não pertence a este estado!");

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

  public async editarEnderecoPessoa(req: Request, res: Response): Promise<Response> {
    try {
      const dados: EnderecoPessoaValidator = await validaParametros<EnderecoPessoaValidator, any>(EnderecoPessoaValidator, req.body);
      let enderecoRetornar:   PessoaEndereco;
      let objetoUpdate:       any     = { };
      let enderecoAtualizado: boolean = false;
      let mensagem:           string  = "";

      // verifica se a pessoa existe
      // ------------------------------------------------------------------------------------------------------
      let pessoaExistente: Pessoa = await this.obtemPessoa(undefined, dados.pessoaId);

      if (!pessoaExistente)
        throw new Error(`A pessoa informada, não existe cadastrada. ID: ${dados.pessoaId}`);

      // verifica se a pessoa possui endereco
      // ------------------------------------------------------------------------------------------------------
      const enderecoPessoa: Endereco = await this.buscaEnderecoPessoa(dados.pessoaId) as Endereco;

      // para editar um endereço, o mesmo precisa existir
      if (!enderecoPessoa)
        throw new Error("Esta pessoa não possui endereço cadastrado, para editar um endereço, ele precisa existir!");

      // verifica opcoes
      // ------------------------------------------------------------------------------------------------------
      const tipoEndereco: string = await new HelperOpcoes().obtemOpcao(EnumGruposOpcoes.TiposEndereco, dados.opcoesTipoId);

      if (!tipoEndereco)
        throw new Error("O Tipo do endereço informado está cadastrado!");

      // verifica estado
      // ------------------------------------------------------------------------------------------------------
      const estado: Estado = await new HelperEstado().obtemEstado(undefined, dados.estadoId);

      if (!estado)
        throw new Error("O Estado informado não está cadastrado!");

      // verifica cidade
      // ------------------------------------------------------------------------------------------------------
      const cidade: Cidade = await new HelperCidade().obtemCidade(undefined, dados.cidadeId);

      if (!cidade)
        throw new Error("A Cidade informada não está cadastrada!");

      if (cidade.estadoId != estado.id)
        throw new Error("Esta cidade não pertence a este estado!");

      // verifica bairro
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

      // Tenta atualizar somente as propriedades alteradas
      objetoUpdate = retornaDiferencaObjetos(enderecoPessoa.dataValues, endereco.dataValues)

      if (Object.keys(objetoUpdate).length > 0) {
        await this.db().transaction(async (transaction: Transaction)=> {
            enderecoAtualizado = await new HelperEndereco().atualizaEnderecoExistente(enderecoPessoa, objetoUpdate, transaction);
        });
      }

      // ------------------------------------------------------------------------------------------------------
      // define a mensagem a ser retornada ao usuário

      if (enderecoPessoa && Object.keys(objetoUpdate).length > 0) {
        mensagem = "Endereço atualizado com sucesso!";
      } else if (Object.keys(objetoUpdate).length <= 0) {
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
  }*/
}