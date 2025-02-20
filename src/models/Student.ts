import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Student extends Model {
  declare id: number;
  declare name: string;
  declare gender: string;
  declare class: string;
  declare dateOfBirth: Date;
  declare bloodGroup: string;
  declare religion: string;
  declare admissionDate: Date;
  declare photoUrl: string | null;
  declare parentId: number;
}

Student.init(
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
    gender: DataTypes.STRING,
    class: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    bloodGroup: DataTypes.STRING,
    religion: DataTypes.STRING,
    admissionDate: DataTypes.DATE,
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Parent",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Student",
  }
);

export default Student;


// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config/database";
// import Parent from "./Parent";

// class Student extends Model {
//   declare id: number;
//   declare name: string;
//   declare gender: string;
//   declare class: string;
//   declare dateOfBirth: Date;
//   declare bloodGroup: string;
//   declare religion: string;
//   declare admissionDate: Date;
//   declare photoUrl: string | null;
//   declare parentId: number;
// }

// Student.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     class: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     dateOfBirth: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     bloodGroup: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     religion: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     admissionDate: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     photoUrl: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     parentId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "parents", // Ensures correct table name
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//   },
//   {
//     sequelize,
//     modelName: "Student",
//     tableName: "students",
//     timestamps: true,
//   }
// );

// // Establish relationship
// Student.belongsTo(Parent, { foreignKey: "parentId", as: "Guardian" });
// Parent.hasMany(Student, { foreignKey: "parentId", as: "Children" });

// export default Student;
