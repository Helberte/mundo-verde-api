import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import sanitizeHtml from "sanitize-html";

class GrupoEmpresaValidator {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(3, 3, { message: "O tamanho do codigo é inválido" })
  @IsNotEmpty({ message: "O codigo do grupo é obrigatório" })
  @IsNumberString({ no_symbols: true }, {message: "Codigo do grupo é inválido"})
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  codigo: string;
}

class GrupoEmpresaValidatorFind {
  @Length(1, 70, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(3, 3, { message: "O tamanho do codigo é inválido" })
  @IsNumberString({ no_symbols: true }, {message: "Codigo do grupo é inválido"})
  @IsOptional()
  codigo: string;
  
  @IsNumberString({ no_symbols: true }, {message: "Id do Grupo é inválido"})
  @IsOptional()
  id: number;
}

class GrupoEmpresaValidatorDelete {
  @IsNumber({ maxDecimalPlaces: 0 }, {message: "Id do Grupo precisa ser um número inteiro."})
  @IsNotEmpty({ message: "O Id do grupo é obrigatório" })
  id: number;

  @Length(3, 3, { message: "O tamanho do codigo é inválido" })
  @IsNotEmpty({ message: "O codigo do grupo é obrigatório" })
  @IsNumberString({ no_symbols: true }, {message: "Codigo do grupo é inválido"})
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  codigo: string;
}

export {
  GrupoEmpresaValidator,
  GrupoEmpresaValidatorFind,
  GrupoEmpresaValidatorDelete
}