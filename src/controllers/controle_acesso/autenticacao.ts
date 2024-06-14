import Controller from '@controllers/controller'
import { Request, Response } from 'express';


class Autenticacao extends Controller {

  public async obterUsuarios(_req: Request, res: Response) {
    try {

      const teste = await this.db();
      
      res.status(200).json({ mensagem: "sucesso! " + teste.config});

    } catch (error) {
      res.status(500).json( { erro: (error as Error).message } )
    }
  }
}

export default new Autenticacao();