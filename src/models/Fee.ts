import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import FeeGroup from "./FeeGroup";

interface FeeAttributes {
  id: number;
  type: string;
  amount: string;
  feeGroupId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Fee extends Model<FeeAttributes, Optional<FeeAttributes, "id">>
  implements FeeAttributes {
  declare id: number;
  declare type: string;
  declare amount: string;
  declare feeGroupId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Declare the FeeGroup property for TypeScript
  declare FeeGroup?: FeeGroup;
}

Fee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feeGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "fee_groups",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Fee",
    tableName: "fees", 
    timestamps: true, 
  }
);

export default Fee;