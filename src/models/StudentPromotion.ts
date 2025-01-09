import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Student from "./Student";

class StudentPromotion extends Model {
  public id!: number;
  public studentId!: number;
  public fromClass!: string;
  public toClass!: string;
  public promotionDate!: Date;
}

StudentPromotion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Student",
        key: "id",
      },
    },
    fromClass: DataTypes.STRING,
    toClass: DataTypes.STRING,
    promotionDate: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "StudentPromotion",
  }
);

StudentPromotion.belongsTo(Student, { foreignKey: "studentId" });
Student.hasMany(StudentPromotion, { foreignKey: "studentId" });

export default StudentPromotion;
