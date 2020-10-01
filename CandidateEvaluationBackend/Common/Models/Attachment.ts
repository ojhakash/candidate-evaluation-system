import { DataTypes, NOW } from "sequelize";

import DatabaseConnector from "../../utils/DatabaseConnector/DatabaseConnector";
import Candidate from './Candidate';

const Attachment = DatabaseConnector.sequelize.define("attachment", {
  attachment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  attachment: { type: DataTypes.BLOB, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: NOW },
});

Candidate.hasOne(Attachment);
Attachment.belongsTo(Candidate);

export default Attachment;