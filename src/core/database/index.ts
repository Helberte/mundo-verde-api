import { Sequelize } from 'sequelize';



class Database {

  private conexao: Sequelize;

  public async connection() : Promise<Sequelize> {
    this.conexao = new Sequelize('hbyte', 'admin', '672h6r4rncs', {
      host: "hbyte.c786u6qwmgrw.us-east-2.rds.amazonaws.com",
      dialect: "mysql"
    })

    try {
      await this.conexao.authenticate();
    } catch (error) {
      throw new Error("Conexão com banco falhou: " + error);
    }

    return this.conexao;
  }
}

export default Database;