import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/config/database";

interface StudentFeeAttributes {
  id: number;
  name: string;
  gender: string;
  class: string;
  amount: number;
  status: string;
  email?: string;
  phone?: string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class StudentFee extends Model<StudentFeeAttributes, Optional<StudentFeeAttributes, "id">> {
  declare id: number;
  declare name: string;
  declare gender: string;
  declare class: string;
  declare amount: number;
  declare status: string;
  declare email: string | null;
  declare phone: string | null;
  declare dueDate: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Getter for formatted due date
  get formattedDueDate(): string | null {
    const dueDate = this.getDataValue('dueDate'); 
    return dueDate ? dueDate.toISOString().split("T")[0] : null;
  }
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
      type: DataTypes.DECIMAL(10, 2),
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
      field: "due_date", 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "StudentFee",
    tableName: "student_fees", 
    timestamps: true,
  }
);


export default StudentFee;
