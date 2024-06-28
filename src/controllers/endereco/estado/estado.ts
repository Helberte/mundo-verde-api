import Controller from "@controllers/controller";
import { validaParametros } from "@helpers/utils";
import { Request, Response } from "express";
import { EstadoValidator } from "./validacao_dados";
import Estado from "@models/estado";

export default class EstadoController extends Controller {

  public async criarEstado(req: Request, res: Response): Promise<Response> {
    try {      
      const estado: EstadoValidator = await validaParametros<EstadoValidator, any>(EstadoValidator, req.body);
     
      const estadoExistente: Estado = await Estado.findOne(
        {
          where:
          {
            ibgeId: estado.ibgeId
          }
        });
      
      if (estadoExistente)
        throw new Error(`O estado ${estado.nome} IBGEID: ${estado.ibgeId} Já existe cadastrado.`);

      if (estadoExistente.nome.toUpperCase().trim() === estado.nome.toUpperCase().trim())
        throw new Error(`Já existe um registro com o mesmo nome cadastrado. Nome do estado: ${estado.nome}`);

      // consultar o ibgeid na api do ibge para ver se de fato o estado existe
      
      return res.status(200).json({
        mensagem: "sucesso",
        estado
       });
      
    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }    
  }
}