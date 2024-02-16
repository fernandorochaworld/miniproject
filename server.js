const express = require("express"); // We import the express application
const dotenv = require("dotenv"); // Necessary for localhost
const cors = require("cors"); // Necessary for localhost
const app = express(); // Creates an express application in app
const morgan = require("morgan");
const currencyRoutes = require("./routes/currencies-routes");
dotenv.config();

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors());
app.use(express.json());

morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);


/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/api/currency", currencyRoutes);

/**
 * Fallback route (Completed)
 */
app.all("*", (req, res) => {
  return res.status(404).json({ error: "unknown endpoint" }).end();
});

// const { Sequelize } = require('sequelize');

async function conectar() {

  try {
    // const sequelize = new Sequelize('postgres://admin:eaXJiWtfteMaVhbTs4dRbmf1UfM9Phmf@dpg-cn7it6mct0pc738v0c80-a.oregon-postgres.render.com/coding_in_colour_mini_project', {
    //   dialectOptions: {
    //     ssl: true
    //   }
    // }) // Example for postgres
    // const sequelize = new Sequelize('postgres://root:root@localhost/test_db') // Example for postgres
    // const sequelize = new Sequelize('test_db', 'root', 'root', {
    //   host: 'localhost',
    //   dialect: 'postgres'
    // });
    // const sequelize = new Sequelize('coding_in_colour_mini_project', 'admin', 'eaXJiWtfteMaVhbTs4dRbmf1UfM9Phmf', {
    //   host: 'dpg-cn7it6mct0pc738v0c80-a.oregon-postgres.render.com',
    //   dialect: 'postgres',
    //   dialectOptions: {
    //     ssl: true
    //   }
    // });
    // await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
conectar();

const db = require('./models');
db.sequelize.sync().then((req) => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.SERVER_PORT}`);
  });
});



