import { validaCPF } from "@helpers/utils";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Moment } from "moment";
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

  dataNascimento: Moment;

  opcoesSexoId: number;

  email: string;

  telefone1: string;

  telefone2: string;

  rg: string;

  enderecoId: number;
}

class PessoaValidatorFind {
  @Length(2, 70, { message: "O tamanho do nome é inválido" })
  @IsString({ message: "O nome precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nome: string;

  @IsNumberString({ no_symbols: true }, {message: "ibgeId inválido"})
  @IsOptional()
  ibgeId: number;

  @IsNumberString({ no_symbols: true }, {message: "Id do Estado é inválido"})
  @IsOptional()
  estadoId: number;

  @IsNumberString({ no_symbols: true }, {message: "Id inválido"})
  @IsOptional()
  id: number;
}

export { PessoaValidator, PessoaValidatorFind }