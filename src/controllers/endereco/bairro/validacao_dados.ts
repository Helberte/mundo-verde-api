import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import sanitizeHtml from "sanitize-html";

class BairroValidator {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: "Id da cidade é inválido" })
  @IsNotEmpty({ message: "Id da cidade é obrigatório" })
  cidadeId: number;
}

class BairroValidatorFind {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @IsNumberString(undefined, {message: "Id da Cidade é inválido"})
  @IsOptional()
  cidadeId: number;
  
  @IsNumberString(undefined, {message: "Id do Bairro é inválido"})
  @IsOptional()
  id: number;
}

export { BairroValidator, BairroValidatorFind }