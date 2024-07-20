import { Transform, TransformFnParams } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  Min } from "class-validator";
import sanitizeHtml from "sanitize-html";

class PerfilValidator {
  @Length(2, 200, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Max(99999999, { message: "O valor máximo para o ID da empresa foi excedido." })
  @Min(1, { message: "O valor mínimo para o ID da empresa é 1" })
  @IsInt({ message: "O ID da empresa precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O ID da empresa não pode ser vazio" })
  empresaId: number;
}

class PerfilValidatorFind {
  @Length(1, 14, { message: "Tamanho do ID inválido" })
  @IsNumberString({ no_symbols: true }, { message: "Id inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  id: string;

  @Length(1, 200, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(1, 14, { message: "Tamanho do ID da Empresa inválido" })
  @IsNumberString({ no_symbols: true }, { message: "Id da Empresa inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  empresaId: string;
}

class PerfilValidatorUpdate extends PerfilValidator {
  @Max(99999999, { message: "O valor máximo para o ID do menu foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do menu é 1" })
  @IsInt({ message: "O ID do menu precisa ser um número inteiro" })
  @IsNotEmpty({message: "O Id do menu é obrigatorio"})
  id: number;
}

export {
  PerfilValidator,
  PerfilValidatorFind,
  PerfilValidatorUpdate
}