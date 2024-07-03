import SequelizeModel from "@core/database/sequelize_model";
import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Table } from "sequelize-typescript";
import GrupoEmpresa from "./grupo_empresa";
import GrupoOpcoes from "./grupo_opcoes";
import Opcoes from "./opcao";
import Pessoa from "./pessoa";
import EmpresaPessoa from "./empresa_pessoa";
import Perfil from "./perfil";
import Usuario from "./usuario";
import EmpresaUsuario from "./empresa_usuario";
import EmpresaEndereco from "./empresa_endereco";
import { formataCNPJ } from "@helpers/utils";

@Table({ tableName: "empresa", updatedAt: false })
export default class Empresa extends SequelizeModel<Empresa> {

  @AllowNull(false)
  @Column( { field: "razao_social", type: DataType.STRING } )
  razaoSocial: string;

  @AllowNull(true)
  @Column( { field: "nome_fantasia", type: DataType.STRING } )
  nomeFantasia: string;

  @AllowNull(false)
  @Column
  get cnpj(): string {
    return formataCNPJ(this.getDataValue("cnpj"));
  }

  set cnpj(value: string) {
    this.setDataValue("cnpj", value);
  }

  @AllowNull(true)
  @Column
  filial: string

  @ForeignKey(() => GrupoEmpresa)
  @Column({ field: "fk_grupo_empresa_id", type: DataType.NUMBER })
  grupoEmpresaId: number;

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

  @BelongsToMany(() => Usuario, () => EmpresaUsuario)
  usuarios: Usuario[];

  @HasOne(() => EmpresaEndereco)
  empresaEndereco: EmpresaEndereco;
}