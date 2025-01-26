import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User .init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "createdAt",
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updatedAt",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;