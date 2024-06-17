import Controller from '@controllers/controller'
import Estado from '@models/estado';
import { Request, Response } from 'express';

class Autenticacao extends Controller {

  public async obterUsuarios(_req: Request, res: Response) {
    try {

      const estados: Estado[] = await Estado.findAll();

      res.status(200).json( { estados } );

    } catch (error) {
      res.status(500).json( { erro: (error as Error).message } )
    }
  }
}

export default new Autenticacao();