const express = require("express");
const Currency = require("../models/Currency.JS");
const { currencyValidation } = require("../utils/validation");
const { Op } = require("sequelize");
const router = express.Router();

/**
 * TODO: GET Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
router.get("/", async (request, response) => {
  const currencies = await Currency.findAll({include: 'country'});
  response.json(currencies);
});

/**
 * TODO: GET:id Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
router.get("/:id", async (request, response) => {
  const currency = await Currency.findByPk(request.params.id, {include: 'country'});
  if (currency) {
    response.status(200).json(currency);
  } else {
    response.status(404).json({ error: "resource not found" });
  }
});

/**
 * TODO: GET:id Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
router.get("/:id/countryName", async (request, response) => {
  const currency = await Currency.findByPk(request.params.id, {include: 'country', attributes: ['currencyCode']});
  if (currency) {
    response.status(200).json({currencyCode: currency.currencyCode, countryName: currency.country.name});
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
router.post("/", async (request, response) => {
  const { currencyCode, conversionRate, countryId } = request.body;
  const currency = { currencyCode, conversionRate, countryId };

  try {
    currencyValidation(currency);

    const conflictCode = await Currency.findOne({
      where: {
        currencyCode: currency.currencyCode,
      },
    });
    // Validate existing currencyCode
    if (conflictCode) {
      throw new Error("currencyCode already exists.");
    }
  } catch (e) {
    console.error(JSON.stringify(e));
    return response.status(400).json({ error: e.message }).end();
  }

  try {
    const data = await Currency.create(currency);
    return response.status(200).json(data).end();
  } catch (e) {
    console.error(JSON.stringify(e));
    if (e.name === 'SequelizeUniqueConstraintError') {
      return response.status(400).json({ error: 'Country already has a currency.' }).end();
    }
    if (e.name === 'SequelizeForeignKeyConstraintError') {
      return response.status(400).json({ error: 'Country do not exit.' }).end();
    }
    if (e.message) {
      return response.status(400).json({ error: e.message }).end();
    }
    let msg = "";
    e.errors.map((er) => {
      msg += er.message;
    });
    return response.status(400).json({ error: msg }).end();
  }
});

/**
 * TODO: PUT:id endpoint (Completed)
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
router.put("/:id/:newRate", async (request, response) => {
  const currency = await Currency.findByPk(request.params.id);
  if (!currency) {
    return response.status(400).json({ error: "resource not found" });
  }
  currency.conversionRate = parseFloat(request.params.newRate) || 0;
  await currency.save();
  return response.status(200).json(currency);
});

/**
 * TODO: DELETE:id Endpoint (Completed)
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete("/:id", async (request, response) => {
  const currency = await Currency.findByPk(request.params.id);
  if (!currency) {
    return response.status(400).json({ error: "resource not found" });
  }

  await currency.destroy();
  return response.status(204).end();
});

module.exports = router;
