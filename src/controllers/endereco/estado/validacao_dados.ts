import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import sanitizeHtml from "sanitize-html";

class EstadoValidator {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(2, 2, { message: "O tamanho do UF deve ser de 2 caracteres." })
  @IsNotEmpty({ message: "O UF está vazio" })
  @IsString({ message: "O UF não é válido" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  uf: string;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: "ibgeId inválido" })
  @IsNotEmpty({ message: "ibgeId é obrigatório" })
  ibgeId: number;
}

class EstadoValidatorEditar extends EstadoValidator {
  @IsNumber({ maxDecimalPlaces: 0 }, { message: "Id do registro inválido" })
  @IsNotEmpty({ message: "O Id do registro do estado é inválido." })
  id: number;
}

export { EstadoValidator, EstadoValidatorEditar }