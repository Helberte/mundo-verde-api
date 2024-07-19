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

class MenuValidator {
  @Length(2, 200, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(2, 300, { message: "O tamanho da descrição é inválido" })
  @IsNotEmpty({ message: "A descrição está vazia" })
  @IsString({ message: "A descrição precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  descricao: string;

  @Max(99999999, { message: "O valor máximo para o ID do pai foi excedido." })
  @Min(1, { message: "O valor mínimo para o ID do pai é 1" })
  @IsInt({ message: "O ID do pai precisa ser um número inteiro" })
  @IsOptional()
  pai: number;

  @Max(99999999, { message: "O valor máximo para a ordem foi excedido." })
  @Min(1, { message: "O valor mínimo para a ordem é 1" })
  @IsInt({ message: "A ordem precisa ser um número inteiro" })
  @IsNotEmpty({ message: "A Ordem do menu é obrigatoria" })
  ordem: number;
}

class MenuValidatorFind {
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

  @Length(1, 300, { message: "O tamanho da descrição é inválido" })
  @IsString({ message: "A descrição precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  descricao: string;

  @Length(1, 8, { message: "O tamanho da descrição é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "Pai inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  pai: string;

  @Length(1, 8, { message: "O tamanho da descrição é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "Ordem inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  ordem: string;
}

class MenuValidatorUpdate extends MenuValidator {
  @Max(99999999, { message: "O valor máximo para o ID do menu foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do menu é 1" })
  @IsInt({ message: "O ID do menu precisa ser um número inteiro" })
  @IsNotEmpty({message: "O Id do menu é obrigatorio"})
  id: number;
}

export {
  MenuValidator,
  MenuValidatorFind,
  MenuValidatorUpdate
}