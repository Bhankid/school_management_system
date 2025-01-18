import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/config/database";

interface StudentFeeAttributes {
  id: number;
  name: string;
  gender: string;
  class: string;
  amount: string;
  status: string;
  email?: string;
  phone?: string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class StudentFee
  extends Model<StudentFeeAttributes, Optional<StudentFeeAttributes, "id">>
  implements StudentFeeAttributes
{
  public id!: number;
  public name!: string;
  public gender!: string;
  public class!: string;
  public amount!: string;
  public status!: string;
  public email?: string;
  public phone?: string;
  public dueDate?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudentFee.init(
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
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
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
    modelName: "StudentFee",
    timestamps: true,
  }
);

export default StudentFee;
