import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { GrupoEmpresaValidator, GrupoEmpresaValidatorFind } from "./validacao_dados";
import EmpresaController from "../empresa_controller";
import GrupoEmpresa from "@models/grupo_empresa";
import HelperGrupoEmpresa from "@helpers/grupoEmpresa";

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
      // mas listar apenas os grupos 
      
      // revisar esta questão dos grupos de empresas
      
      const grupoEmpresaFind: GrupoEmpresa = new GrupoEmpresa();

      grupoEmpresaFind.nome   = grupoEmpresa.nome;
      grupoEmpresaFind.id     = Number(grupoEmpresa.id);
      grupoEmpresaFind.codigo = grupoEmpresa.codigo;

      const bairros: Bairro[] = await this.listaBairros(bairroFind);

      return res.status(200).json({ bairros });

    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }
  }
}