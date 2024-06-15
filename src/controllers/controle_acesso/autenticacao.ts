import Controller from '@controllers/controller'
import Estado from '@models/estado';
import { Request, Response } from 'express';
// import { QueryTypes } from 'sequelize';

class Autenticacao extends Controller {

  public async obterUsuarios(_req: Request, res: Response) {
    try {

      // const sql: string = `
      //   SELECT *
      //     FROM estado e
      //    WHERE e.deleted_at is NULL
      //    LIMIT 10;
      // `;

      // const estados: any[] = await this.db().query(sql, {
      //   type: QueryTypes.SELECT
      // })

      const estados: any[] = await Estado.findAll();

      res.status(200).json( { estados } );

    } catch (error) {
      res.status(500).json( { erro: (error as Error).message } )
    }
  }
}

export default new Autenticacao();