import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Teacher extends Model {}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "firstName",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lastName",
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "gender",
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "dateOfBirth",
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "bloodGroup",
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "religion",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "email",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone",
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "class",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "address",
    },
    admissionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "admissionDate",
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "photoUrl",
    },
  },
  {
    sequelize,
    modelName: "Teacher",
    tableName: "Teachers",
    underscored: false,
    timestamps: true,
  }
);

export default Teacher;
