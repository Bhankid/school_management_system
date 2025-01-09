import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "school_management_system", 
  process.env.DB_USER || "root", 
  process.env.DB_PASSWORD || "Bhankid@3404", 
  {
    host: process.env.DB_HOST || "localhost", 
    dialect: "mysql", 
    dialectModule: mysql2, 
    port: parseInt(process.env.DB_PORT || "5000"), 
    logging: false, 
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize;
