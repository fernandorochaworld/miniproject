const express = require('express');
const currencyRoutes = require('./currencies-routes');
const countryRoutes = require('./countries-routes');

const router = express.Router();


/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
router.get('/', (request, response) => {
  response.send('Welcome to Currency Converter!');
});

router.use('/api/currency', currencyRoutes);
router.use('/api/country', countryRoutes);

/**
 * Fallback route (Completed)
 */
router.all('*', (req, res) => {
  return res.status(404).json({ error: 'unknown endpoint' }).end();
});

module.exports = router;