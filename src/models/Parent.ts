import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Student from "./Student";

class Parent extends Model {
  declare id: number;
  declare fatherName: string;
  declare motherName: string;
  declare email: string;
  declare phone: string;
  declare fatherOccupation: string;
  declare address: string;
  declare religion: string;
}

Parent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    fatherOccupation: DataTypes.STRING,
    address: DataTypes.STRING,
    religion: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Parent",
  }
);

Parent.hasMany(Student, { foreignKey: "parentId" });
Student.belongsTo(Parent, { foreignKey: "parentId" });

export default Parent;


// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config/database";
// import Student from "./Student";

// class Parent extends Model {
//   declare id: number;
//   declare fatherName: string;
//   declare motherName: string;
//   declare email: string;
//   declare phone: string;
//   declare fatherOccupation: string;
//   declare address: string;
//   declare religion: string;
// }

// Parent.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     fatherName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     motherName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     fatherOccupation: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     religion: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Parent",
//     tableName: "parents",
//     timestamps: true,
//   }
// );

// // Establish relationship
// Parent.hasMany(Student, { foreignKey: "parentId", as: "Children" });
// Student.belongsTo(Parent, { foreignKey: "parentId", as: "Guardian" });

// export default Parent;
