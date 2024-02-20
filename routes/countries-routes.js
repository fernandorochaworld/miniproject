const express = require("express");
const Country = require("../models/Country");
const router = express.Router();

/**
 * TODO: GET Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/country/
 * @responds with returning the data as a JSON
 */
router.get("/", async (request, response) => {
  const notes = await Country.findAll();
  response.json(notes);
});

/**
 * TODO: GET:id Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/api/country/:id
 * @responds with returning specific data as a JSON
 */
router.get("/:id", async (request, response) => {
  const country = await Country.findByPk(request.params.id);
  if (country) {
    response.status(200).json(country);
  } else {
    response.status(404).json({ error: "resource not found" });
  }
});

/**
 * TODO: POST Endpoint (Completed)
 * @receives a post request to the URL: http://localhost:3001/api/country,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
router.post("/", async (request, response) => {
  const { name } = request.body;

  try {
    if (!name) {
      throw new Error("name is missing");
    }
  } catch (e) {
    console.error(JSON.stringify(e));
    return response.status(400).json({ error: e.message }).end();
  }

  try {
    const data = await Country.create({ name });
    return response.status(200).json(data).end();
  } catch (e) {
    response
      .status(404)
      .json({ error: "error to insert record: " + e?.message });
  }
});

/**
 * TODO: PUT:id endpoint (Completed)
 * @receives a put request to the URL: http://localhost:3001/api/country/:id/:newRate
 * with data object enclosed
 * Hint: updates the country with the new conversion rate
 * @responds by returning the newly updated resource
 */
router.put("/:id/:newName", async (request, response) => {
  const country = await Country.findByPk(request.params.id);
  if (!country) {
    return response.status(400).json({ error: "resource not found" });
  }
  country.name = request.params.newName;
  await country.save();
  return response.status(200).json(country);
});

/**
 * TODO: DELETE:id Endpoint (Completed)
 * @receives a delete request to the URL: http://localhost:3001/api/country/:id,
 * @responds by returning a status code of 204
 */
router.delete("/:id", async (request, response) => {
  const country = await Country.findByPk(request.params.id);
  if (!country) {
    return response.status(400).json({ error: "resource not found" });
  }

  country.destroy();
  return response.status(204).end();
});

module.exports = router;
