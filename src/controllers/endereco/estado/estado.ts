import Controller from "@controllers/controller";
import { validaParametros } from "@helpers/utils";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { Request, Response } from "express";

class EstadoValidator {
  @Length(5, 70, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  nome: string;

  @Length(2, 2, { message: "O tamanho do UF deve ser de 2 caracteres." })
  @IsNotEmpty({ message: "O UF está vazio" })
  @IsString({ message: "O UF não é válido" })
  uf: string;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: "ibgeId inválido" })
  @IsNotEmpty({ message: "ibgeId é obrigatório" })
  ibgeId: number;
}

export default class Estado extends Controller {

  public async criarEstado(req: Request, res: Response): Promise<Response> {
    try {
      
      await validaParametros<EstadoValidator, any>(EstadoValidator, req.body);
     
      // proteget contra ataque de xss

      return res.status(200).json({ mensagem: "sucesso" });
      
    } catch (error) {
      return res.status(500).json({ erro: (error as Error).message });
    }    
  }
}