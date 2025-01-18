import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface ExpenseAttributes {
  id: number;
  name: string;
  expenseType: string;
  amount: string;
  status: string;
  email: string;
  phone: string;
  dueDate: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

class Expense extends Model<ExpenseAttributes, Optional<ExpenseAttributes, "id">>
  implements ExpenseAttributes {
  declare id: number;
  declare name: string;
  declare expenseType: string;
  declare amount: string;
  declare status: string;
  declare email: string;
  declare phone: string;
  declare dueDate: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Expense.init(
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
    expenseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Expense",
  }
);

export default Expense;
