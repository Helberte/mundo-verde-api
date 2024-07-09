import { plainToClass } from "class-transformer";
import { ValidationError, isArray, validate } from "class-validator";
import moment from "moment";
import { literal } from "sequelize";
import { isInt } from "validator";

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

/**
 * @description Retorna um objeto contendo os campos padrões que devem ser
 * preenchidos numa operação de delete suave.
 *
 * @returns Objeto com campos padrões para operação de delete suave
 *
 * @author Helberte Costa
 */
export function deleteCamposDefault(): any {
  return {
    deletedAt: moment(),
    updatedAt: literal("IFNULL(updated_at, null)")
  }
}

/**
 * Fonte:
 * https://blog.dbins.com.br/como-funciona-a-logica-da-validacao-do-cnpj
 * https://www.macoratti.net/alg_cnpj.htm
 *
 * O cnpj é formado por 14 números sendo 12 numeros base e 2 digitos verificadores
 * os 2 verificadores servem para validar os 12 primeiros base.
 *
 * OBS: Mesmo que o número do cnpj seja válido, não significa que o mesmo está cadastrado na Receita Federal.
 *
 * @author Helberte Costa
 *
 * @date 02/07/2024
 *
 * @param cnpj
 * @returns
 */
export function validarCNPJ(cnpj: string): boolean {
  let valorCNPJ:   string = "";
  let contador_1:  number = 0;

  let soma_1:      number = 0;
  let soma_2:      number = 0;
  let restoDiv_1:  number = 0;
  let restoDiv_2:  number = 0;

  let digitoVerificador_1: number = 0;
  let digitoVerificador_2: number = 0;

  const array_1:   number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const array_2:   number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  // desconsidera tudo que não é número inteiro
  for (const caractere of cnpj) {
    if (isInt(caractere))
      valorCNPJ += caractere;
  }

  // desconsidera fora do tamanho correto
  if (valorCNPJ.length != 14)
    return false;

  // compara o 1° valor com o restante e se forem todos iguais, desconsidera o cnpj
  for (let i = 0; i < valorCNPJ.length; i++) {
    if (valorCNPJ[0] === valorCNPJ[i])
      contador_1 = contador_1 + 1;
  }

  if (contador_1 === 14)
    return false;

  /*-------------------------------------------------------------------------------------------------*/

  // 1° - Multiplicação e soma

  /*-------------------------------------------------------------------------------------------------*/

  for (let i = 0; i < array_1.length; i++)
    soma_1 = soma_1 + (Number(valorCNPJ[i]) * array_1[i]);

  restoDiv_1 = soma_1 % 11;

  if (restoDiv_1 < 2)
    digitoVerificador_1 = 0;
  else
  if ([2, 3, 4, 5, 6, 7, 8, 9, 10].includes(restoDiv_1))
    digitoVerificador_1 = 11 - restoDiv_1;
  else
    return false;

  /*-------------------------------------------------------------------------------------------------*/

  // 2° - Multiplicação e soma

  /*-------------------------------------------------------------------------------------------------*/

  for (let i = 0; i < array_2.length; i++)
    soma_2 = soma_2 + (Number(valorCNPJ[i]) * array_2[i]);

  restoDiv_2 = soma_2 % 11;

  if (restoDiv_2 < 2)
    digitoVerificador_2 = 0;
  else
  if ([2, 3, 4, 5, 6, 7, 8, 9, 10].includes(restoDiv_2))
    digitoVerificador_2 = 11 - restoDiv_2;
  else
    return false;

  /*-------------------------------------------------------------------------------------------------*/

  // Verifica o resultado
  if (Number(valorCNPJ[12]) === digitoVerificador_1 && Number(valorCNPJ[13]) === digitoVerificador_2)
    return true;
  else
    return false;
}

/**
 * @description Limpa um texto dos caracteres especiais deixando apenas os números presentes nele.
 *
 * Ex: valor de entrada: 1.;15;*5#7!7#@8'8"8)9$1 => valor de saída: 115577888
 *
 * @param texto A ser limpo
 * @returns Uma string com o texto limpo sem caracteres especiais
 */
export function limpaFormatacaoNumeros(texto: string): string {
  try {

    if(!texto)
      return texto;

    let numeroLimpo: string = "";

    for (const caractere of texto) {
      if (isInt(caractere))
        numeroLimpo = numeroLimpo + caractere;
    }

    return numeroLimpo;
  } catch (error) {
    return "N/A";
  }
}

export function formataCNPJ(cnpj: string): string {
  try {
    if(!cnpj)
      return cnpj;

    let   cnpjFormatado: string = "";
    const cnpjLimpo:     string = limpaFormatacaoNumeros(cnpj);

    for (let i = 0; i < cnpjLimpo.length; i++) {

      cnpjFormatado = cnpjFormatado + cnpjLimpo[i];

      if (i == 1)
        cnpjFormatado = cnpjFormatado + ".";

      if (i == 4)
        cnpjFormatado = cnpjFormatado + ".";

      if (i == 7)
        cnpjFormatado = cnpjFormatado + "/";

      if (i == 11)
        cnpjFormatado = cnpjFormatado + "-";

      if (cnpjFormatado.length === 18)
        break;
    }

    return cnpjFormatado;

  } catch (error) {
    return "N/A";
  }
}

export function formataCEP(cep: string): string {
  try {
    let cepLimpo:     string = limpaFormatacaoCEP(cep);
    let cepFormatado: string = "";

    if (cepLimpo.length !== 8)
      return undefined;

    for (let i = 0; i < cepLimpo.length; i++) {
      cepFormatado = cepFormatado + cepLimpo[i];
      if (i === 4)
        cepFormatado = cepFormatado + "-";
    }

    return cepFormatado;

  } catch (error) {
    return undefined;
  }
}

export function limpaFormatacaoCEP(cep: string): string {
  try {
    let cepLimpo: string = "";

    for (const caractere of cep) {
      if(isInt(caractere))
        cepLimpo = cepLimpo + caractere;
    }

    if (cep.length === 8)
      return cepLimpo;

    return undefined;
  } catch (error) {
    return undefined;
  }
}

export function retornaDiferencaObjetos(objeto1: any, objeto2: any): any {
  try {
    if(Object.keys(objeto1).length > 0 && Object.keys(objeto2).length > 0) {

      const arrayObjeto_1: [string, any][] = Object.entries(objeto1);
      const arrayObjeto_2: [string, any][] = Object.entries(objeto2);

      let stringJSON:  string = "";
      let objetoFinal: any    = { };

      for (var [keyObj1, valorObj1] of arrayObjeto_1) {
        for (var [keyObj2, valorObj2] of arrayObjeto_2) {

          if (keyObj1 == "id") break;

          if ((keyObj1 == keyObj2) && valorObj1 != valorObj2) {
            stringJSON += `\"${keyObj2}\": \"${valorObj2}\",`;
            break;
          }

          if (keyObj1 == keyObj2) break;
        }
      }

      objetoFinal = JSON.parse("{ " + stringJSON.substring(0, stringJSON.length - 1) + " }");

      return objetoFinal;
    } else {
      return { };
    }
  } catch (error) {
    return { };
  }
}

/**
 * fontes:
 * https://www.macoratti.net/alg_cpf.htm
 * https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/
 *
 * @param cpf
 * @returns
 */
export function validaCPF(cpf: string): boolean {
  try {
    if(!cpf)
      return false;

    let soma_1:     number = 0;
    let soma_2:     number = 0;
    let restoDiv_1: number = 0;
    let restoDiv_2: number = 0;
    let contador_1: number = 0;

    const array_1: number[] = [10, 9,  8, 7, 6, 5, 4, 3, 2]
    const array_2: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    let cpfLimpo:       string = limpaFormatacaoNumeros(cpf);
    let cpfValidacao_2: string = "";

    if (cpfLimpo.length != 11) return false;

    // ------------------------------------------------------------------------------------------------

    for (let i = 0; i < cpfLimpo.length; i++) {
      if (cpfLimpo[0] == cpfLimpo[i])
        contador_1++;
    }

    if (contador_1 == 11) return false;

    // ------------------------------------------------------------------------------------------------

    for (let i = 0; i < array_1.length; i++)
      soma_1 = soma_1 + (Number(cpfLimpo[i]) * array_1[i]);

    restoDiv_1 = (soma_1 * 10) % 11;

    if (restoDiv_1 == 10) restoDiv_1 = 0;

    // 1° Validação
    if (Number(cpfLimpo[9]) != restoDiv_1) return false;

    // ------------------------------------------------------------------------------------------------

    cpfValidacao_2 = cpfLimpo.substring(0, 9) + String(restoDiv_1);

    for (let i = 0; i < array_2.length; i++)
      soma_2 = soma_2 + (Number(cpfValidacao_2[i]) * array_2[i]);

    restoDiv_2 = (soma_2 * 10) % 11;

    if (restoDiv_2 == 10) restoDiv_2 = 0;

    // 2° Validação
    if (Number(cpfLimpo[10]) != restoDiv_2) return false;

    return true;

  } catch (error) {
    return false;
  }
}

export function formataCPF(cpf: string): string {
  try {
    let cpfLimpo:     string = limpaFormatacaoNumeros(cpf);
    let cpfFormatado: string = "";

    if (cpfLimpo.length !== 11)
      return undefined;

    for (let i = 0; i < cpfLimpo.length; i++) {
      cpfFormatado = cpfFormatado + cpfLimpo[i];

      if (i === 2)
        cpfFormatado = cpfFormatado + ".";

      if (i === 5)
        cpfFormatado = cpfFormatado + ".";

      if (i === 8)
        cpfFormatado = cpfFormatado + "-";
    }

    return cpfFormatado;

  } catch (error) {
    return undefined;
  }
}