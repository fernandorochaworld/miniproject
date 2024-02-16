const express = require("express"); // We import the express application
const cors = require("cors"); // Necessary for localhost
const app = express(); // Creates an express application in app
const morgan = require("morgan");
const currencyRoutes = require("./routes/currencies-routes");

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
