import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Student extends Model {
  declare id: number;
  declare name: string;
  declare gender: string;
  declare class: string;
  declare dateOfBirth: Date;
  declare bloodGroup: string;
  declare religion: string;
  declare admissionDate: Date;
  declare photoUrl: string | null;
  declare parentId: number;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: DataTypes.STRING,
    class: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    bloodGroup: DataTypes.STRING,
    religion: DataTypes.STRING,
    admissionDate: DataTypes.DATE,
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Parent",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Student",
  }
);

export default Student;
