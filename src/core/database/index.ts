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
        dialectOptions: {
          connectTimeout: 10000
        },
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        define: {
          defaultScope: {
            attributes: {
              exclude: ["deletedBy", "updatedBy", "createdBy", "deletedAt", "updatedAt", "createdAt"]
            }
          },
          updatedAt: false,
          timestamps: false,
          paranoid: false
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


//#region Fonte
/*
  import { ExecutionContext, Module } from '@nestjs/common';
  import { SequelizeModule } from '@nestjs/sequelize';
  import dayjs from 'dayjs';
  import { RequestContext } from 'nestjs-request-context';
  import { join } from 'path';

  @Module({
    imports: [
      SequelizeModule.forRootAsync({
        useFactory: () => ({
          dialect: "mssql",
          host: process.env.DB_HOST,
          // port: 3306,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          timezone: process.env.APP_TIMEZONE,
          logging: process.env.NODE_ENV !== 'production' ? console.log : false,
          models: [join(__dirname, '../../models/*.model{.ts,.js}')],

          sincronize: process.env.NODE_ENV !== 'production' || false,

          autoLoadModels: false,
          dialectOptions: {
            connectTimeout: 30000,
            typeCast(field: any, next: any) {
              if (['DATE', 'DATETIME'].includes(field.type)) {
                return field.string();
              } else if (field.type === 'NEWDECIMAL') {
                return field.float();
              }

              return next();
            },
          },
          pool: {
            max: 100,
            idle: 3000,
          },
          define: {
            defaultScope: {
              attributes: {
                exclude: ['createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'deletedBy', 'deletedAt'],
              },
            },
            updatedAt: false,
            timestamps: false,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
          },
          hooks: {
            beforeCreate(instances) {
              const req: any = RequestContext.currentContext ? RequestContext.currentContext.req : {};
              const loginAuth = req.user ? req.user.login : null;
              const loginHeader = req.headers ? req.headers['x-login'] : null;

              instances.dataValues.createdBy = loginHeader || loginAuth;
            },
            beforeBulkDestroy(options: any) {
              options.individualHooks = true;
            },
            beforeBulkUpdate(options) {
              options.individualHooks = true;
            },
            beforeDestroy(instances, { transaction }) {
              const req: any = RequestContext.currentContext ? RequestContext.currentContext.req : {};
              const loginAuth = req.user ? req.user.login : null;
              const loginHeader = req.headers ? req.headers['x-login'] : null;

              instances.update({
                deletedBy: loginHeader || loginAuth,
                deletedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
              }, { transaction });
            },
            beforeUpdate(instances, options) {
              const req: any = RequestContext.currentContext ? RequestContext.currentContext.req : {};

              const loginAuth = req.user ? req.user.login : null;
              const loginHeader = req.headers ? req.headers['x-login'] : null;

              instances.dataValues.updatedBy = loginHeader || loginAuth;
              instances.dataValues.updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

              options.fields.push('updatedBy', 'updatedAt');
            },
          },
        }),
      }),
    ],
  })
  export class DatabaseModule {}
*/
//#endregion