import { Transform, TransformFnParams } from "class-transformer";
import {
  IsHash,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  Min } from "class-validator";
import sanitizeHtml from "sanitize-html";

class UsuarioValidator {
  @Length(2, 120, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(2, 70, { message: "O tamanho do login é inválido" })
  @IsNotEmpty({ message: "O login está vazio" })
  @IsString({ message: "O login precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  login: string;

  @Length(8, 1000, { message: "O tamanho da senha é inválido" })
  @IsNotEmpty({ message: "A senha precisa ser um texto" })
  @IsHash("md5", { message: "Formato da senha inválido" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  senha: string;

  @Length(1, 1, { message: "O tamanho do campo ativo é inválido" })
  @IsNotEmpty({ message: "O campo ativo está vazio" })
  @IsString({ message: "O campo ativo precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  ativo: string;

  @Max(99999999, { message: "O valor máximo para o ID da pessoa foi excedido." })
  @Min(1, { message: "O valor mínimo para o ID da pessoa é 1" })
  @IsInt({ message: "O ID da pessoa precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id da pessoa é obrigatorio" })
  pessoaId: number;
}

class UsuarioValidatorFind {
  @Length(1, 14, { message: "Tamanho do ID inválido" })
  @IsNumberString({ no_symbols: true }, { message: "Id inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  id: string;

  @Length(1, 120, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(1, 70, { message: "O tamanho do login é inválido" })
  @IsString({ message: "O login precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  login: string;

  @Length(1, 1, { message: "O tamanho do campo ativo é inválido" })
  @IsString({ message: "O campo ativo precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  ativo: string;

  @Length(1, 14, { message: "Tamanho do ID da pessoa é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "Id da pessoa inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  pessoaId: string;
}

class UsuarioValidatorUpdate extends UsuarioValidator {
  @Max(99999999, { message: "O valor máximo para o ID da pessoa foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID da pessoa é 1" })
  @IsInt({ message: "O ID da pessoa precisa ser um número inteiro" })
  @IsNotEmpty({message: "O Id da pessoa é obrigatorio"})
  id: number;
}

export {
  UsuarioValidator,
  UsuarioValidatorFind,
  UsuarioValidatorUpdate
}