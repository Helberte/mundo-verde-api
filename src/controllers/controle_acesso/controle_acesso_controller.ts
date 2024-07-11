import Controller from "@controllers/controller"
import HelperEmpresa from "@helpers/empresa";
import { limpaFormatacaoNumeros, limpaObjeto, returnObjetoLike } from "@helpers/utils";
import Bairro from "@models/bairro";
import Cidade from "@models/cidade";
import Empresa from "@models/empresa";
import EmpresaPessoa from "@models/empresa_pessoa";
import Endereco from "@models/endereco";
import Estado from "@models/estado";
import { GruposDeOpcoes } from "@models/grupo_opcoes";
import Opcoes from "@models/opcao";
import Pessoa from "@models/pessoa";
import PessoaEndereco from "@models/pessoa_endereco";
import moment from "moment";
import { Op, Transaction } from "sequelize";

class ControleAcessoController extends Controller {
  //#region Pessoa

  async obtemPessoa(cpf?: string, id?: number, transaction?: Transaction): Promise<Pessoa> {
    const where: any = { }

    if (cpf) {
      cpf = limpaFormatacaoNumeros(cpf);

      if (cpf.length != 11)
        throw new Error("Informe um CPF válido.");

      where.cpf = cpf;
    }

    if (id)
      where.id = id;

    const pessoa: Pessoa = await Pessoa.findOne({ where, transaction });

    return pessoa;
  }

  async inserePessoaEmpresa(empresaId: number, pessoaId: number, transaction?: Transaction): Promise<void> {

    // valida a empresa
    // --------------------------------------------------------------------------------------------------------------
    const empresa: Empresa = await new HelperEmpresa().obtemEmpresa(undefined, empresaId, transaction);

    if (!empresa)
      throw new Error("Empresa informada não está cadastrada ou foi deletada! ID: " + empresaId);

    // valida a pessoa
    // --------------------------------------------------------------------------------------------------------------
    const pessoa: Pessoa = await this.obtemPessoa(undefined, pessoaId, transaction);

    if (!pessoa)
      throw new Error("Pessoa informada não existe ou foi deletada. ID: " + pessoaId);

    // Verifica se a pessoa já foi inserida nesta empresa
    // --------------------------------------------------------------------------------------------------------------
    const empresaPessoaExistente: EmpresaPessoa = await EmpresaPessoa.findOne({
      where: {
        pessoaId,
        empresaId
      },
      transaction
    });

    if (empresaPessoaExistente)
      throw new Error("Esta pessoa já está cadastrada nesta empresa. ID Pessoa: " + pessoaId + ", ID Empresa: " + empresaId);

    // --------------------------------------------------------------------------------------------------------------
    //                                          insere a pessoa na empresa
    // --------------------------------------------------------------------------------------------------------------

    const empresaPessoa: EmpresaPessoa = new EmpresaPessoa();

    empresaPessoa.empresaId = empresaId;
    empresaPessoa.pessoaId  = pessoaId;

    await empresaPessoa.save({ transaction });

    // --------------------------------------------------------------------------------------------------------------
  }

  async listaPessoas(pessoa?: Pessoa, limit: number = 50): Promise<Pessoa[]> {
    const find: any = limpaObjeto(pessoa.dataValues);
    const like: any = returnObjetoLike(find, [ "nome", "sobrenome", "cpf", "email", "telefone1", "telefone2", "rg" ]);

    const { dataNascimento } = find;

    delete find.nome;
    delete find.sobrenome;
    delete find.cpf;
    delete find.dataNascimento;
    delete find.email;
    delete find.telefone1;
    delete find.telefone2;
    delete find.rg;

    return await Pessoa.findAll({
      where: {
        ...find,
        ...like,
        dataNascimento: {
          [Op.substring]: dataNascimento ? moment(dataNascimento).format("YYYY-MM-DD") : ""
        }
      },
      order: [
        ["nome", "ASC"]
      ],
      limit
    });
  }

  async buscaEnderecoPessoa(pessoaId: number, enderecoCompleto: boolean = false): Promise<Endereco | PessoaEndereco> {
    let pessoaEndereco: PessoaEndereco;
    let endereco:       Endereco;

    if (!enderecoCompleto) {
      endereco = (await PessoaEndereco.findOne(
        {
          attributes: ["id"],
          include: [
            {
              model: Endereco,
              required: true
            },
            {
              model: Pessoa,
              required: true,
              attributes: ["id", "nome", "cpf", "rg"],
              where: {
                id: pessoaId
              }
            }
          ]
        }
      ))?.endereco;

    } else {
      pessoaEndereco = await PessoaEndereco.findOne(
        {
          attributes: {
            exclude: [ ...this.excludeBase, "enderecoId", "pessoaId" ]
          },
          include: [
            {
              model: Endereco,
              required: true,
              attributes: {
                exclude: [ ...this.excludeBase, "opcoesTipoId", "bairroId", "cidadeId", "estadoId" ]
              },
              include: [
                {
                  model: Opcoes,
                  required: true,
                  where: {
                    grupoOpcoesId: GruposDeOpcoes.TiposEndereco
                  }
                },
                {
                  model: Estado,
                  required: true
                },
                {
                  model: Bairro,
                  required: true
                },
                {
                  model: Cidade,
                  required: true
                }
              ]
            },
            {
              model: Pessoa,
              required: true,
              where: {
                id: pessoaId
              }
            }
          ]
        }
      );
    }

    return endereco ? endereco : pessoaEndereco;
  }

  async insereEnderecoPessoa(endereco: Endereco, pessoaId: number, transaction: Transaction): Promise<Endereco> {

    const enderecoInserido: Endereco = await endereco.save({ transaction });

    const pessoaEndereco: PessoaEndereco = new PessoaEndereco();

    pessoaEndereco.pessoaId   = pessoaId;
    pessoaEndereco.enderecoId = enderecoInserido.id;

    await pessoaEndereco.save({ transaction });

    return enderecoInserido;
  }

  //#endregion
}

export default ControleAcessoController;