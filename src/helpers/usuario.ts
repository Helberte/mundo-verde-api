import Controller from "@controllers/controller";
import Empresa from "@models/empresa";
import Pessoa from "@models/pessoa";
import Usuario from "@models/usuario";
import { Transaction } from "sequelize";

class HelperUsuario extends Controller {

  async obtemUsuarioPessoa(pessoaId: number, transaction?: Transaction): Promise<Usuario> {

    if (!pessoaId)
      throw new Error("É preciso informar o Id da pessoa.");

    const usuario: Usuario = (await Pessoa.findOne({
      include: {
        model: Usuario,
        required: true
      },
      where: {
        id: pessoaId
      },
      transaction
    }))?.usuario;

    return usuario;
  }

  async obtemUsuarioLoginNome(login?: string, nome?: string, transaction?: Transaction): Promise<Usuario> {
    const where: any = { };

    if (!login && !nome)
      throw new Error("É preciso informar o Id da pessoa ou o nome.");

    if (login)
      where.login = login;

    if (nome)
      where.nome = nome;

    const usuario: Usuario = await Usuario.findOne({
      where,
      transaction
    });

    return usuario;
  }

  async obtemUsuarioEmpresaNome(empresaId: number, login?: string, nome?: string, transaction?: Transaction): Promise<Usuario> {

    const where: any = { };

    if (!login && !nome)
      throw new Error("É preciso informar o Id da pessoa ou o nome.");

    if (!empresaId)
      throw new Error("Informe o Id da Empresa.");

    if (login)
      where.login = login;

    if (nome)
      where.nome = nome;

    const usuario: Usuario = await Usuario.findOne({
      include: {
        attributes: ["id", "nome_fantasia"],
        model: Empresa,
        required: true,
        where: {
          id: empresaId
        }
      },
      where,
      transaction
    })

    return usuario;
  }
}

export default HelperUsuario;