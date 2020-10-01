import { DataTypes, NOW } from "sequelize";

import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";

const Candidate = DatabaseConnector.sequelize.define("candidate", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  web_address: { type: DataTypes.STRING, allowNull: false },
  cover_letter: { type: DataTypes.STRING, allowNull: false },
  fond_of_working: { type: DataTypes.STRING, allowNull: false },
  ip: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: NOW },
});

export default Candidate;