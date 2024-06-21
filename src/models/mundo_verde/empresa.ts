import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import GrupoEmpresa from "./grupo_empresa";
import GrupoOpcoes from "./grupo_opcoes";
import Opcoes from "./opcao";
import Endereco from "./endereco";
import Pessoa from "./pessoa";
import EmpresaPessoa from "./empresa_pessoa";
import Perfil from "./perfil";

@Table({ tableName: "empresa" })
export default class Empresa extends SequelizeModel<Empresa> {

  @AllowNull(false)
  @Column( { field: "razao_social", type: DataType.STRING } )
  razaoSocial: string;

  @AllowNull(true)
  @Column( { field: "nome_fantasia", type: DataType.STRING } )
  nomeFantasia: string;

  @AllowNull(false)
  @Column
  cnpj: string;

  @AllowNull(true)
  @Column
  filial: string

  @ForeignKey(() => Endereco)
  @Column({field: "fk_endereco_id", type: DataType.NUMBER})
  enderecoId: number

  @ForeignKey(() => GrupoEmpresa)
  @Column({ field: "fk_grupo_empresa_id", type: DataType.NUMBER })
  grupoEmpresaId: number;

  @BelongsTo(() => Endereco)
  endereco: Endereco;

  @BelongsTo(() => GrupoEmpresa)
  grupoEmpresa: GrupoEmpresa;

  @HasMany(() => GrupoOpcoes)
  gruposOpcoes: GrupoOpcoes[];

  @HasMany(() => Opcoes)
  opcoes: Opcoes[];

  @BelongsToMany(() => Pessoa, () => EmpresaPessoa)
  pessoas: Pessoa[];

  @HasMany(() => Perfil)
  perfis: Perfil[];
}