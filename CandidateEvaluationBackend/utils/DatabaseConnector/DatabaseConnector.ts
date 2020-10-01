import { connect } from "http2";
import { Sequelize, DataTypes, NOW } from "sequelize";

export default class DatabaseConnector {
  private _sequelize: Sequelize;
  
  constructor() {
    this._sequelize = new Sequelize(
      "candidate_evaluation_system",
      "candidate_evaluation_admin",
      "password",
      {
        host: "localhost",
        dialect: "postgres",
      }
    );
  }

  
  public static get sequelize() : Sequelize {
      let databaseConnector = new DatabaseConnector();
      return databaseConnector._sequelize;
  }
}
