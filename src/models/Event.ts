import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface EventAttributes {
  id: number;
  title: string;
  description: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type EventCreationAttributes = Optional<EventAttributes, "id">;

class Event extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare date: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "Events",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    underscored: false
  }
);

export default Event;