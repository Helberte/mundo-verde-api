import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";
import sanitizeHtml from "sanitize-html";
import { IsInt, Max, Min } from "sequelize-typescript";

class EmpresaValidator {
  //#region Empresa

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

  @Length(14, 14, { message: "O tamanho CNPJ é inválido" })
  @IsNotEmpty({ message: "O CNPJ está vazio" })
  @IsString({ message: "O CNPJ precisa ser um texto" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cnpj: string;

  @Length(2, 8, { message: "O tamanho da Filial é inválido" })
  @IsNotEmpty({ message: "A Filial está vazia" })
  @IsNumberString({ no_symbols: true }, { message: "A Filial é inválida" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  filial: string;

  @IsInt
  @IsNotEmpty({message: "O Id do Grupo de Empresas é obrigatorio"})
  @Min(0)
  @Max(99999999)
  grupoEmpresaId: number;

  //#endregion

  //#region Endereço

  @Length(5, 100, { message: "O tamanho do nome da rua é inválido" })
  @IsString({ message: "O nome da rua precisa ser um texto" })
  @IsNotEmpty({ message: "O nome da rua é obrigatorio" })
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rua: string;

  @Length(1, 15, { message: "O tamanho número é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O número só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  numero: string;

  @Length(8, 10, { message: "O tamanho CEP é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O CEP só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cep: string;

  @Length(5, 300, { message: "O tamanho da observação é inválido" })
  @IsString({ message: "A Observacao precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  observacao: string;

  @Length(5, 300, { message: "O tamanho do complemento é inválido" })
  @IsString({ message: "O complemento precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  complemento: string;

  @IsInt
  @IsNotEmpty({message: "O Id do Tipo é obrigatorio"})
  @Min(0)
  @Max(99999999)
  opcoesTipoId: number;

  @IsInt
  @IsNotEmpty({message: "O Id do Bairro é obrigatorio"})
  @Min(0)
  @Max(99999999)
  bairroId: number;

  @IsInt
  @IsNotEmpty({message: "O Id da Cidade é obrigatorio"})
  @Min(0)
  @Max(99999999)
  cidadeId: number;

  @IsInt
  @IsNotEmpty({message: "O Id do Estado é obrigatorio"})
  @Min(0)
  @Max(99999999)
  estadoId: number;

  //#endregion
}

class EmpresaValidatorFind {
  //#region Empresa

  @Length(1, 150, { message: "O tamanho da Razão Social é inválido" })
  @IsString({ message: "A Razão Social precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  razaoSocial: string;

  @Length(1, 150, { message: "O tamanho do Nome Fantasia é inválido" })
  @IsString({ message: "O Nome Fantasia precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  nomeFantasia: string;

  @Length(1, 14, { message: "O tamanho CNPJ é inválido" })
  @IsString({ message: "O CNPJ precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cnpj: string;

  @Length(1, 8, { message: "O tamanho da Filial é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "A Filial é inválida" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  filial: string;

  @IsInt
  @IsNotEmpty({message: "O Id do Grupo de Empresas é obrigatorio"})
  @Min(0)
  @Max(99999999)
  @IsOptional()
  grupoEmpresaId: number;

  //#endregion

  //#region Empresa

  @Length(1, 100, { message: "O tamanho do nome da rua é inválido" })
  @IsString({ message: "O nome da rua precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  rua: string;

  @Length(1, 15, { message: "O tamanho número é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O número só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  numero: string;

  @Length(1, 10, { message: "O tamanho CEP é inválido" })
  @IsNumberString({ no_symbols: true }, { message: "O CEP só pode conter números" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  cep: string;

  @Length(1, 300, { message: "O tamanho da observação é inválido" })
  @IsString({ message: "A Observacao precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  observacao: string;

  @Length(1, 300, { message: "O tamanho do complemento é inválido" })
  @IsString({ message: "O complemento precisa ser um texto" })
  @IsOptional()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  complemento: string;

  @IsInt
  @IsNotEmpty({message: "O Id do Tipo do Endereço é obrigatorio"})
  @Min(0)
  @Max(99999999)
  @IsOptional()
  opcoesTipoId: number;

  @IsInt
  @IsNotEmpty({message: "O Id do Bairro é obrigatorio"})
  @Min(0)
  @Max(99999999)
  @IsOptional()
  bairroId: number;

  @IsInt
  @IsNotEmpty({message: "O Id da Cidade é obrigatorio"})
  @Min(0)
  @Max(99999999)
  @IsOptional()
  cidadeId: number;

  @IsInt
  @IsNotEmpty({message: "O Id do Estado é obrigatorio"})
  @Min(0)
  @Max(99999999)
  @IsOptional()
  estadoId: number;

  //#endregion
}

class EmpresaValidatorDelete {
  @IsInt
  @IsNotEmpty({message: "O Id da Empresa é obrigatorio"})
  @Min(0)
  @Max(99999999)
  id: number;
}

export {
  EmpresaValidator,
  EmpresaValidatorFind,
  EmpresaValidatorDelete
}