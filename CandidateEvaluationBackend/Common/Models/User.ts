import { DataTypes, NOW } from "sequelize";

import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";

const User = DatabaseConnector.sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  myDate: { type: DataTypes.DATE, defaultValue: NOW },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export default User;