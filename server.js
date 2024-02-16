const express = require("express"); // We import the express application
const cors = require("cors"); // Necessary for localhost
const app = express(); // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors());
app.use(express.json());

/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number,
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1,
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75,
  },
];

// Auto incremented ID
let currencyAutoIncrementId = 2;

function findCurrency(id) {
  return currencies.find((item) => item.id == id);
}

function currencyValidation(currency) {
  // Validate attributes
  Object.keys(currency).forEach((key) => {
    if (!(key === "conversionRate" && currency[key] === 0) && !currency[key]) {
      throw new Error(`${key} is required.`);
    }
  });

  // Validate existing record
  if (currencies.find((item) => item.currencyCode === currency.currencyCode)) {
    throw new Error("Currency already exists.");
  }
}

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get("/", (request, response) => {
  response.send("Hello World!");
});

/**
 * TODO: GET Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get("/api/currency/", (request, response) => {
  response.json(currencies);
});

/**
 * TODO: GET:id Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get("/api/currency/:id", (request, response) => {
  const currency = findCurrency(request.params.id);
  if (currency) {
    response.status(200).json(currency);
  } else {
    response.status(400).json({ error: "Currency not found." });
  }
});

/**
 * TODO: POST Endpoint (Completed)
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post("/api/currency", (request, response) => {
  const { currencyCode, country, conversionRate } = request.body;
  const currency = { currencyCode, country, conversionRate };

  try {
    currencyValidation(currency);
  } catch (e) {
    console.error(JSON.stringify(e));
    return response.status(400).json({ error: e.message }).end();
  }

  currency.id = ++currencyAutoIncrementId;
  currencies.push(currency);
  return response.status(200).json(currency);
});

/**
 * TODO: PUT:id endpoint (Completed)
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
app.put("/api/currency/:id/:newRate", (request, response) => {
  const currency = findCurrency(request.params.id);
  if (!currency) {
    return response.status(400).json({ error: "Currency not found." });
  }
  currency.conversionRate = parseFloat(request.params.newRate) || 0;
  return response.status(200).json(currency);
});

/**
 * TODO: DELETE:id Endpoint (Completed)
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
app.delete("/api/currency/:id", (request, response) => {
  const currency = findCurrency(request.params.id);
  if (!currency) {
    return response.status(400).json({ error: "Currency not found." });
  }

  currencies = currencies.filter(item => item.id !== currency.id)
  return response.status(204);
});

app.all("*", (req, res) => {
  return res.status(404).json({ error: "unknown endpoint" }).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
