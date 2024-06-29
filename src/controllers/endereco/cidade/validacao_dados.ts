import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import sanitizeHtml from "sanitize-html";

class CidadeValidator {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: "ibgeId inválido" })
  @IsNotEmpty({ message: "ibgeId é obrigatório" })
  ibgeId: number;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: "Id do Estado é inválido" })
  @IsNotEmpty({ message: "Id do Estado é obrigatório" })
  estadoId: number;
}

class CidadeValidatorFind {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @IsNumberString(undefined, {message: "ibgeId inválido"})
  @IsOptional()
  ibgeId: number;

  @IsNumberString(undefined, {message: "Id do Estado é inválido"})
  @IsOptional()
  estadoId: number;
}

export { CidadeValidator, CidadeValidatorFind }