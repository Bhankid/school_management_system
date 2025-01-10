import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Subject extends Model {
  declare id: number;
  declare subjectName: string;
  declare teacher: string;
  declare classes: string;
  declare days: string;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "subjectName", // Matches the DB column name
    },
    teacher: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "teacher", // Matches the DB column name
    },
    classes: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "classes", // Matches the DB column name
    },
    days: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "days", // Matches the DB column name
    },
  },
  {
    sequelize,
    modelName: "Subject",
    tableName: "subjects",
    underscored: false, // Prevents Sequelize from converting to snake_case
    timestamps: true, // Enables `createdAt` and `updatedAt`
  }
);

export default Subject;
