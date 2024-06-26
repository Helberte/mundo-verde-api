import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

class Database {

  private conexao: Sequelize;

  async config() {
    this.conexao = new Sequelize(
      process.env.DB_MYSQL_DATABASE,
      process.env.DB_MYSQL_USERNAME,
      process.env.DB_MYSQL_PASSWORD, {
        host: process.env.DB_MYSQL_HOST,
        dialect: process.env.DB_MYSQL_DIALECT as Dialect,
        models: [__dirname.substring(0, __dirname.indexOf("dist")) + "dist\\src\\models\\mundo_verde"],
        define: {
          defaultScope: {
            attributes: {
              exclude: ["deletedBy", "updatedBy", "createdBy", "deletedAt", "updatedAt", "createdAt"]
            }
          }
        },
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        dialectOptions: {
          connectTimeout: 10000
        }
      }
    );

    try {
      await this.conexao.authenticate();
    } catch (error) {
      throw new Error("Conexão com banco falhou: " + error);
    }
  }

  public connection(): Sequelize{
    return this.conexao;
  }
}

export default Database;