const express = require("express"); // We import the express application
require("dotenv").config(); // Necessary for localhost
const cors = require("cors"); // Necessary for localhost
const app = express(); // Creates an express application in app
const morgan = require("morgan");
const routes = require("./routes/routes");

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

app.use("/", routes);

try {
  const { sequelize } = require("./config/config");

  sequelize.sync({ force: true }).then((req) => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server running on port: ${process.env.SERVER_PORT}`);
    });
  });

  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
