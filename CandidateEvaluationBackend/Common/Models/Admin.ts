import { DataTypes, NOW } from "sequelize";

import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";

const Admin = DatabaseConnector.sequelize.define("admin", {
  admin_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: NOW },
});

export default Admin;
