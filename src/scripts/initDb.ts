import sequelize from "../config/database";
import "../models/Student";
import "../models/Parent";
import "../models/StudentPromotion";
import "../models/Teacher";
import "../models/Subject";

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`✅ Database ${process.env.DB_NAME} created successfully.`);

    await sequelize.sync({ force: true }); // Sync models (force: true for development only)
    console.log("✅ Tables created successfully.");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
};

initDatabase();
