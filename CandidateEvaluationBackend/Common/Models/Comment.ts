import { DataTypes, NOW } from "sequelize";

import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";
import Admin from './Admin';
import Candidate from './Candidate';

const Comment = DatabaseConnector.sequelize.define("comment", {
  comment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  commentText: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: NOW },
});

Admin.hasMany(Comment);
Comment.belongsTo(Admin);
Candidate.hasMany(Comment);
Comment.belongsTo(Candidate);

export default Comment;