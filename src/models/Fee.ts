import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import FeeGroup from "./FeeGroup"; // Import the FeeGroup model

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
    },
  },
  {
    sequelize,
    modelName: "Fee",
  }
);

export default Fee;