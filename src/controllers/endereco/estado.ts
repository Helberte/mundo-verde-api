import Controller from "@controllers/controller";
import { plainToClass } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Length, validate } from "class-validator";
import { Request, Response } from "express";

class EstadoValidator {
  @Length(5, 70)
  @IsNotEmpty()
  @IsString()
  nome: string;

  @Length(2, 2)
  @IsNotEmpty()
  @IsString()
  uf: string;

  @IsNumber()
  @IsNotEmpty()
  ibgeId: number;
}

export default class Estado extends Controller {

  public async criarEstado(req: Request, res: Response): Promise<Response> {

    const teste: EstadoValidator = plainToClass(EstadoValidator, req.body);

    const erros = await validate(teste);

    if (erros.length > 0) {
      let textoErro = '';

      erros.forEach(erro => {
        textoErro += Object.values(erro.constraints).join(', ');
      });

      return res.status(500).json({ erro: textoErro });
    }

    return res.status(200).json({ mensagem: "sucesso" });
  }
}