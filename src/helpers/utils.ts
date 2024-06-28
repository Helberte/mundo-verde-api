import { plainToClass } from "class-transformer";
import { ValidationError, isArray, validate } from "class-validator";

export async function validaParametros<T extends Object, O>(classe: new () => T, objeto: O): Promise<T> {
  const objetoResultante: T = plainToClass<T, O>(classe, objeto)
  const erros: ValidationError[] = await validate(objetoResultante);
  let retorno: string = "";

  if (erros.length > 0) {
    erros.forEach(erro => {
      retorno += Object.values(erro.constraints).join(" | ");
    });

    throw new Error(retorno);
  }

  return objetoResultante;
}

export function validaRespostaRequisicao(parametro: any) : boolean {
  if (isArray(parametro)) {
    if (parametro.length < 1) {
      return false;
    }
  } else {
    if (parametro == null || parametro == undefined || parametro == "") {
      return false;
    }
  }

  return true;
}