import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export async function validaParametros<T extends Object, O>(classe: new () => T, objeto: O): Promise<boolean> {  
  const objetoResultante: T = plainToClass<T, O>(classe, objeto)  
  const erros: ValidationError[] = await validate(objetoResultante);
  let retorno: string = "";

  if (erros.length > 0) {
    erros.forEach(erro => {
      retorno += Object.values(erro.constraints).join(" | ");
    });

    throw new Error(retorno);
  }

  return true;
}