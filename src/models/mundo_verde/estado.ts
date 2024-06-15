import { DataTypes, Model } from "sequelize";

class Estado extends Model {

};

Estado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ibge_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Estado",
    tableName: "estado"
  }
);

export default Estado;