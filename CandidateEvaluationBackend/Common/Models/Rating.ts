import { DataTypes, NOW } from "sequelize";

import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";
import Admin from './Admin';
import Candidate from './Candidate';

const Rating = DatabaseConnector.sequelize.define("rating", {
  rating_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: NOW },
});

Admin.hasMany(Rating);
Rating.belongsTo(Admin);
Candidate.hasMany(Rating);
Rating.belongsTo(Candidate);

export default Rating;