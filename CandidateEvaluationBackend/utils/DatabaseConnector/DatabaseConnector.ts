import { connect } from "http2";
import { Sequelize, DataTypes, NOW } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

process.env.database_name;
process.env.database_user;
process.env.database_password;
process.env.database_host;
process.env.database_dialect;
export default class DatabaseConnector {
  private _sequelize: Sequelize;

  constructor() {
    let database_name: any = process.env.database_name;
    let database_user: any = process.env.database_user;
    let database_password: any = process.env.database_password;
    let database_host: any = process.env.database_host;
    let database_dialect: any = process.env.database_dialect;

    this._sequelize = new Sequelize(
      database_name,
      database_user,
      database_password,
      {
        host: database_host,
        dialect: database_dialect,
        logging: false,
      }
    );
  }

  public static get sequelize(): Sequelize {
    let databaseConnector = new DatabaseConnector();
    return databaseConnector._sequelize;
  }
}
