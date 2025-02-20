import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Fee from "./Fee"; 

interface FeeGroupAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class FeeGroup extends Model<FeeGroupAttributes, Optional<FeeGroupAttributes, "id">>
  implements FeeGroupAttributes {
  declare id: number;
  declare name: string;
  declare description?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Declare the Fees property for TypeScript
  declare Fees?: Fee[];
}

FeeGroup.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "FeeGroup",
    tableName: "fee_groups", 
    timestamps: true, 
  }
);

// Define the association with Fee
FeeGroup.hasMany(Fee, { foreignKey: "feeGroupId", as: "Fees" });
Fee.belongsTo(FeeGroup, { foreignKey: "feeGroupId", as: "FeeGroup" });

export default FeeGroup;
