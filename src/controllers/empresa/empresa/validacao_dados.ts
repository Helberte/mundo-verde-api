import { limpaFormatacaoCNPJ, validarCNPJ } from "@helpers/utils";
import { Transform, TransformFnParams } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
}
  from "class-validator";
import sanitizeHtml from "sanitize-html";

@ValidatorConstraint({ name: "validaCnpj", async: false })
class validadorCNPJ implements ValidatorConstraintInterface {

  validate(value: string, _validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    return validarCNPJ(value);
  }

  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'CNPJ ($value) é inválido!';
  }
}

class EmpresaValidator {
  @Length(5, 150, { message: "O tamanho da Razão Social é inválido" })
  @IsNotEmpty({ message: "A Razão Social está vazia" })
  @IsString({ message: "A Razão Social precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  razaoSocial: string;

  @Length(5, 150, { message: "O tamanho do Nome Fantasia é inválido" })
  @IsNotEmpty({ message: "O Nome Fantasia está vazio" })
  @IsString({ message: "O Nome Fantasia precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nomeFantasia: string;

  @Validate(validadorCNPJ)
  @Length(14, 18, { message: "O tamanho CNPJ é inválido" })
  @IsNotEmpty({ message: "O CNPJ está vazio" })
  @IsString({ message: "O CNPJ precisa ser um texto" })
  @Transform((params: TransformFnParams) => limpaFormatacaoCNPJ(sanitizeHtml(params.value)))
  cnpj: string;

  @Length(2, 8, { message: "O tamanho da Filial é inválido" })
  @IsNotEmpty({ message: "A Filial está vazia" })
  @IsNumberString({ no_symbols: true }, { message: "A Filial é inválida" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  filial: string;

  @Max(99999999, { message: "O valor máximo para o ID do grupo da empresa foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do grupo da empresa é 1" })
  @IsInt({ message: "O ID do grupo da empresa precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id do Grupo de Empresas é obrigatorio" })
  grupoEmpresaId: number;
}

class EmpresaValidatorUpdate extends EmpresaValidator {
  @Max(99999999, { message: "O valor máximo para o ID da empresa foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID da empresa é 1" })
  @IsInt({ message: "O ID da empresa precisa ser um número inteiro" })
  @IsNotEmpty({message: "O Id da Empresa é obrigatorio"})
  id: number;
}

class EmpresaValidatorFind {
  //#region Empresa

  @IsNumberString({ no_symbols: true }, { message: "O ID da empresa é Inválido." })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  id: string;

  @Length(1, 150, { message: "O tamanho da Razão Social é inválido" })
  @IsString({ message: "A Razão Social precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  razaoSocial?: string;

  @Length(1, 150, { message: "O tamanho do Nome Fantasia é inválido" })
  @IsString({ message: "O Nome Fantasia precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nomeFantasia?: string;

  @Length(1, 18, { message: "O tamanho CNPJ é inválido" })
  @IsString({ message: "O CNPJ precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cnpj?: string;

  @Length(1, 8, { message: "O tamanho da Filial é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "A Filial é inválida" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  filial?: string;

  @IsNumberString({ no_symbols: true }, { message: "O ID do grupo de Empresas é Inválido." })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  grupoEmpresaId?: string;

  //#endregion

  //#region Endereço
/*
  @Length(1, 100, { message: "O tamanho do nome da rua é inválido" })
  @IsString({ message: "O nome da rua precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rua?: string;

  @Length(1, 15, { message: "O tamanho número é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O número só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  numero?: string;

  @Length(1, 10, { message: "O tamanho CEP é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O CEP só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cep?: string;

  @Length(1, 300, { message: "O tamanho da observação é inválido" })
  @IsString({ message: "A Observacao precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  observacao?: string;

  @Length(1, 300, { message: "O tamanho do complemento é inválido" })
  @IsString({ message: "O complemento precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  complemento?: string;

  @Max(99999999, { message: "O valor máximo para o ID do tipo do endereço foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do tipo do endereço é 1" })
  @IsInt({ message: "O ID do tipo do endereço precisa ser um número inteiro" })
  @IsOptional()
  opcoesTipoId?: number;

  @Max(99999999, { message: "O valor máximo para o ID do bairro foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do bairro é 1" })
  @IsInt({ message: "O ID do bairro precisa ser um número inteiro" })
  @IsOptional()
  bairroId?: number;

  @Max(99999999, { message: "O valor máximo para o ID da cidade foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID da cidade é 1" })
  @IsInt({ message: "O ID da cidade precisa ser um número inteiro" })
  @IsOptional()
  cidadeId?: number;

  @Max(99999999, { message: "O valor máximo para o ID do estado foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do estado é 1" })
  @IsInt({ message: "O ID do estado precisa ser um número inteiro" })
  @IsOptional()
  estadoId?: number;
*/
  //#endregion
}

class EmpresaValidatorDelete {
  @Max(99999999, { message: "O valor máximo para o ID da empresa foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID da empresa é 1" })
  @IsInt({ message: "O ID da empresa precisa ser um número inteiro" })
  @IsNotEmpty({message: "O Id da Empresa é obrigatorio"})
  id: number;
}

class EnderecoEmpresaValidator {
  //#region Endereço

  @Length(1, 100, { message: "O tamanho do nome da rua é inválido" })
  @IsString({ message: "O nome da rua precisa ser um texto" })
  @IsNotEmpty({ message: "O nome da rua é obrigatorio" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rua: string;

  @Length(1, 15, { message: "O tamanho do número é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O número só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  numero?: string;

  @Length(8, 8, { message: "O tamanho CEP é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O CEP só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cep?: string;

  @Length(5, 300, { message: "O tamanho da observação é inválido" })
  @IsString({ message: "A Observacao precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  observacao?: string;

  @Length(5, 300, { message: "O tamanho do complemento é inválido" })
  @IsString({ message: "O complemento precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  complemento?: string;

  @IsBoolean({ message: "A liberação precisa ser booleana, true ou false" })
  @IsOptional()
  liberacao: boolean;

  @Max(99999999, { message: "O valor máximo para o ID da Empresa foi excedido." })
  @Min(1, { message: "O valor mínimo para o ID da empresa é 1" })
  @IsInt({ message: "O ID da empresa precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id da empresa é obrigatorio" })
  empresaId: number;

  @Max(99999999, { message: "O valor máximo para o ID do tipo do endereço foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do tipo do endereço é 1" })
  @IsInt({ message: "O ID do tipo do endereço precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id do tipo do endereço é obrigatorio" })
  opcoesTipoId: number;

  @Max(99999999, { message: "O valor máximo para o ID do bairro foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do bairro é 1" })
  @IsInt({ message: "O ID do bairro precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id do bairro é obrigatorio" })
  bairroId: number;

  @Max(99999999, { message: "O valor máximo para o ID da cidade foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID da cidade é 1" })
  @IsInt({ message: "O ID da cidade precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id da cidade é obrigatorio" })
  cidadeId: number;

  @Max(99999999, { message: "O valor máximo para o ID do estado foi excedido." })
  @Min(1, {message: "O valor mínimo para o ID do estado é 1" })
  @IsInt({ message: "O ID do estado precisa ser um número inteiro" })
  @IsNotEmpty({ message: "O Id do estado é obrigatorio" })
  estadoId: number;

  //#endregion
}

class EmpresaValidatorObterEndereco {
  @IsNumberString({ no_symbols: true }, { message: "O ID da empresa é Inválido." })
  @IsNotEmpty({message: "O Id da Empresa é obrigatorio"})
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  empresaId: string;

  @IsNotEmpty({ message: "O CNPJ está vazio" })
  @Length(14, 18, { message: "O tamanho CNPJ é inválido" })
  @IsString({ message: "O CNPJ precisa ser um texto" })
  @Validate(validadorCNPJ)
  @Transform((params: TransformFnParams) => limpaFormatacaoCNPJ(sanitizeHtml(params.value)))
  cnpj: string;
}

export {
  EmpresaValidator,
  EmpresaValidatorFind,
  EmpresaValidatorDelete,
  EmpresaValidatorUpdate,
  EnderecoEmpresaValidator,
  EmpresaValidatorObterEndereco
}