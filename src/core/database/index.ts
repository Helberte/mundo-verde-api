import { Dialect, Sequelize } from 'sequelize';

class Database {

  private conexao: Sequelize;

  async config() {
    this.conexao = new Sequelize(process.env.DB_MYSQL_DATABASE, process.env.DB_MYSQL_USERNAME, process.env.DB_MYSQL_PASSWORD, {
      host: process.env.DB_MYSQL_HOST,
      dialect: process.env.DB_MYSQL_DIALECT as Dialect
    })

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