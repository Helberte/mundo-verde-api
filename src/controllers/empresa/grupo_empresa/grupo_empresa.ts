import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { GrupoEmpresaValidator, GrupoEmpresaValidatorDelete, GrupoEmpresaValidatorFind } from "./validacao_dados";
import EmpresaController from "../empresa_controller";
import GrupoEmpresa from "@models/grupo_empresa";
import HelperGrupoEmpresa from "@helpers/grupoEmpresa";
import Empresa from "@models/empresa";

export default class GrupoEmpresaController extends EmpresaController {

  public async criarGrupoEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const grupoEmpresa: GrupoEmpresaValidator = await validaParametros<GrupoEmpresaValidator, any>(GrupoEmpresaValidator, req.body);

      // ------------------------------------------------------------------------------------------------------

      // insere o grupo
      const novoGrupo: GrupoEmpresa = new GrupoEmpresa();

      novoGrupo.nome   = grupoEmpresa.nome;
      novoGrupo.codigo = grupoEmpresa.codigo;

      const retorno: GrupoEmpresa = await (new HelperGrupoEmpresa()).insereGrupoEmpresa(novoGrupo);

      // ------------------------------------------------------------------------------------------------------

      return res.status(200).json({
        mensagem: "Grupo Empresa inserido com sucesso!",
        grupoEmpresa: retorno
       });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async buscaGrupoEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      const grupoEmpresa: GrupoEmpresaValidatorFind = await validaParametros<GrupoEmpresaValidatorFind, any>(GrupoEmpresaValidatorFind, req.query);

      // esta rota precisa do usuário, para não listar todos os grupos de empresas presentes no banco
      // mas listar apenas os grupos das empresas na qual o usuário tem acesso
      
      // O processo de login o usuário irá informar qual grupo e empresa ele irá querer entrar para navegar no sistema
      
      const grupoEmpresaFind: GrupoEmpresa = new GrupoEmpresa();

      grupoEmpresaFind.nome   = grupoEmpresa.nome;
      grupoEmpresaFind.id     = Number(grupoEmpresa.id);
      grupoEmpresaFind.codigo = grupoEmpresa.codigo;

      const gruposEmpresas: GrupoEmpresa[] = await this.listaGruposEmpresas(grupoEmpresaFind);

      return res.status(200).json({ gruposEmpresas });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }

  public async excluirGrupoEmpresa(req: Request, res: Response): Promise<Response> {
    try {
      // por enquanto ainda não tem validação de usuário com o grupo de empresas, mas precisará existir

      const grupoEmpresa: GrupoEmpresaValidatorDelete = await validaParametros<GrupoEmpresaValidatorDelete, any>(GrupoEmpresaValidatorDelete, req.body);

      const grupoExistente: GrupoEmpresa = await this.obtemGrupoEmpresa(grupoEmpresa.id, grupoEmpresa.codigo ? grupoEmpresa.codigo : undefined);

      if (!grupoExistente)
        throw new Error("Grupo de Empresas informado não existe cadastrado na base de dados.");

      const empresas: Empresa[] = await this.obtemEmpresasComGrupoEmpresa(grupoEmpresa.id, grupoEmpresa.codigo);

      if (empresas.length > 0) {
        return res.status(200).json({ 
          quantidadeEmpresas: empresas.length,
          empresas
         });
      }

      // exclui o grupo empresa
      await (new HelperGrupoEmpresa()).excluiGrupoEmpresa(grupoExistente);

      return res.status(200).json({ mensagem: "Grupo Empresa excluído com sucesso!" });

      /*
      
      verificar porque não stá pondo is null em deleted_at nas consultas
      verificar porque está gravando updated_at nas exclusões

      */

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}