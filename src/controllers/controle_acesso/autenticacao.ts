import Controller from '@controllers/controller'
import Cidade from '@models/cidade';
import Estado from '@models/estado';
import { Request, Response } from 'express';

class Autenticacao extends Controller {

  public async obterUsuarios(_req: Request, res: Response) {
    try {

      const estado: Estado = await Estado.findByPk(2);

      if (estado) {

        const cidade: Cidade = await Cidade.findOne({
          where: {
            ibgeId: 1100114
          }
        });

        if (!cidade) {
          await Cidade.build({
            nome: "JARU",
            ibgeId: 1100114,
            estadoId: estado.id
          }).save();
        }

        const estadoCidades: Estado[] = await Estado.findAll({
          include: {
            model: Cidade,
            required: true
          }
        });

        res.status(200).json( { estadoCidades } )

      } else
        throw new Error("Não foi possível encontrar este estado. <br>Id: " + 2);

    } catch (error) {
      res.status(500).json( { erro: (error as Error).message } )
    }
  }
}

export default new Autenticacao();