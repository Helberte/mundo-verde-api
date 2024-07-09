import { validaCPF } from "@helpers/utils";
import { Transform, TransformFnParams } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface } from "class-validator";
import moment, { Moment } from "moment";
import sanitizeHtml from "sanitize-html";

@ValidatorConstraint({ name: "validaCpf", async: false })
class validadorCPF implements ValidatorConstraintInterface {

  validate(value: string, _validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    return validaCPF(value);
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'CPF ($value) é inválido!';
  }
}

@ValidatorConstraint({ name: "validaDataNascimento", async: false })
class validadorDataNascimento implements ValidatorConstraintInterface {

  validate(value: string, _validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    try {
      const data: Moment = moment(value);

      if (data < moment("1920-01-01"))
        return false;

      if (data > moment())
        return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Data de nascimento inválida: $value!';
  }
}

class PessoaValidator {
  @Length(2, 100, { message: "O tamanho do nome é inválido" })
  @IsNotEmpty({ message: "O nome está vazio" })
  @IsString({ message: "O nome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(2, 100, { message: "O tamanho do sobrenome é inválido" })
  @IsNotEmpty({ message: "O sobrenome está vazio" })
  @IsString({ message: "O sobrenome precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  sobrenome: string;

  @Validate(validadorCPF)
  @Length(11, 14, { message: "O tamanho do CPF é inválido" })
  @IsNotEmpty({ message: "O CPF está vazio" })
  @IsString({ message: "O CPF precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cpf: string;

  @Validate(validadorDataNascimento)
  @MaxLength(14, { message: "O tamanho máximo da data foi excedido!" })
  @MinLength(8, { message: "O tamanho mínimo da data foi excedido!" })
  @IsNotEmpty({ message: "A Data do nascimento é obrigatoria" })
  @IsDateString(undefined, { message: "Data de Nascimento Inválida: $value" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  dataNascimento: string;

  @Max(99999999, { message: "O valor máximo para o ID do sexo foi excedido." })
  @Min(1, { message: "O valor mínimo para o ID do sexo é 1" })
  @IsInt({ message: "O ID do sexo precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id do sexo é obrigatorio" })
  opcoesSexoId: number;

  @Length(4, 150, { message: "Tamanho do email inválido" })
  @IsEmail(undefined, { message: "Email inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  email: string;

  @Length(8, 14, { message: "Tamanho do telefone inválido" })
  @IsMobilePhone("pt-BR", { strictMode: false }, { message: "Número de telefone inválido" })
  @IsString({ message: "O telefone precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  telefone1: string;

  @Length(8, 14, { message: "Tamanho do telefone inválido" })
  @IsMobilePhone("pt-BR", { strictMode: false }, { message: "Número de telefone inválido" })
  @IsString({ message: "O telefone precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  telefone2: string;

  @Length(2, 20, { message: "Tamanho do RG inválido" })
  @IsNumberString({ no_symbols: true }, { message: "RG inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rg: string;
}

class PessoaValidatorFind {
  @IsNumberString({ no_symbols: true }, { message: "Id inválido" })
  @IsOptional()
  id: number;

  @Length(1, 100, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @Length(1, 100, { message: "O tamanho do sobrenome é inválido" })
  @IsString({ message: "O sobrenome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  sobrenome: string;

  @Length(1, 14, { message: "O tamanho do CPF é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O CPF precisa ser somente números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cpf: string;

  @MaxLength(14, { message: "O tamanho máximo da data foi excedido!" })
  @MinLength(1, { message: "O tamanho mínimo da data foi excedido!" })
  @IsString({ message: "Data de Nascimento Inválida: $value" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  dataNascimento: string;

  @Max(99999999, { message: "O valor máximo para o ID do sexo foi excedido." })
  @Min(1, { message: "O valor mínimo para o ID do sexo é 1" })
  @IsInt({ message: "O ID do sexo precisa ser um número inteiro" })
  @IsOptional()
  opcoesSexoId: number;

  @Length(1, 150, { message: "Tamanho do email inválido" })
  @IsString({ message: "O email precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  email: string;

  @Length(1, 14, { message: "Tamanho do telefone inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O Telefone precisa ser somente números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  telefone1: string;

  @Length(1, 14, { message: "Tamanho do telefone inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O Telefone precisa ser somente números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  telefone2: string;

  @Length(1, 20, { message: "Tamanho do RG inválido" })
  @IsNumberString({ no_symbols: true }, { message: "RG inválido" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rg: string;
}

class PessoaValidatorUpdate extends PessoaValidator {
  @Max(99999999, { message: "O valor máximo para o ID da pessoa foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID da pessoa é 1" })
  @IsInt({ message: "O ID da pessoa precisa ser um número inteiro" })
  @IsNotEmpty({message: "O Id da pessoa é obrigatorio"})
  id: number;
}

export {
  PessoaValidator,
  PessoaValidatorFind,
  PessoaValidatorUpdate
}