const express = require("express");
const {
  findCurrency,
  currencyValidation,
} = require("../utils/data-currencies");
let {
  currencies,
  currencyAutoIncrementId,
} = require("../utils/data-currencies");

const router = express.Router();

/**
 * TODO: GET Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
router.get("/", (request, response) => {
  response.json(currencies);
});

/**
 * TODO: GET:id Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
router.get("/:id", (request, response) => {
  const currency = findCurrency(request.params.id);
  if (currency) {
    response.status(200).json(currency);
  } else {
    response.status(404).json({ error: "resource not found" });
  }
});

/**
 * TODO: POST Endpoint (Completed)
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
router.post("/", (request, response) => {
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
  return response.status(200).json(currency).end();
});

/**
 * TODO: PUT:id endpoint (Completed)
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
router.put("/:id/:newRate", (request, response) => {
  const currency = findCurrency(request.params.id);
  if (!currency) {
    return response.status(400).json({ error: "resource not found" });
  }
  currency.conversionRate = parseFloat(request.params.newRate) || 0;
  return response.status(200).json(currency);
});

/**
 * TODO: DELETE:id Endpoint (Completed)
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete("/:id", (request, response) => {
  const currency = findCurrency(request.params.id);
  if (!currency) {
    return response.status(400).json({ error: "resource not found" });
  }

  currencies = currencies.filter((item) => item.id !== currency.id);
  return response.status(204).end();
});

module.exports = router;