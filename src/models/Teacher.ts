import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface TeacherAttributes {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  bloodGroup: string;
  religion: string;
  email?: string;
  phone?: string;
  class: string;
  address: string;
  admissionDate: Date;
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Teacher extends Model<TeacherAttributes, Optional<TeacherAttributes, 'id'>> {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare gender: string;
  declare dateOfBirth: Date;
  declare bloodGroup: string;
  declare religion: string;
  declare email: string;
  declare phone: string;
  declare class: string;
  declare address: string;
  declare admissionDate: Date;
  declare photoUrl: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

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
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9+() -]+$/,
      },
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admissionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
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