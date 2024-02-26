require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

console.log('process.env.DB_NAME', process.env.DB_NAME);

// Setup sequelize for connecting to our database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// This authentication authenticates connection, export this
const authenticateConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("We have successfully connected to database...");
  } catch (error) {
    console.log("Unable to connect to database...");
  }
};

module.exports = { sequelize, authenticateConnection };
