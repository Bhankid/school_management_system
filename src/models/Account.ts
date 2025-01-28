import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Account extends Model {
  public id!: number;
  public schoolName!: string;
  public email!: string;
  public mobile!: string;
  public city!: string;
  public address!: string;
  public username!: string;
  public password!: string;
  public language!: string;
  public profileImage!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  schoolName: {
    type: DataTypes.STRING,
    field: 'school_name',
  },
  email: {
    type: DataTypes.STRING,
  },
  mobile: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  language: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING,
    field: 'profile_image',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
  },
}, {
  sequelize,
  modelName: 'Account',
  tableName: 'Account',
});

export default Account;