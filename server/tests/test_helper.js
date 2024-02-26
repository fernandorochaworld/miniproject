/**
 * Provide the path to your test currency model, this model will be exactly the same as your Currency model, except...
 * It will not require the connection to Country.
 */
const Country = require('../models/Country');
const Currency = require('../models/Currency');

/**
 * We need to initialize our test tables, so we will write variables to store our initial database state,
 * as well as some helper functions that can be used in our tests!
 */

const initialCountries = [
  {id: 1, name: 'Canada'},
  {id: 2, name: 'USA'},
];
const initialCurrencies = [
  {
    id: 1, 
    currencyCode: 'CDN',
    conversionRate: 1,
    countryId: 1
  },
  {
    id: 2,
    currencyCode: 'USD',
    conversionRate: 0.75,
    countryId: 2
  }
];

// Returns all currencies from the DB table
const currenciesInDb = async () => {
  const testCurrencies = await Currency.findAll({});
  return testCurrencies.map(currency => currency.toJSON());
};

// Initialize table
const init = async () => {
  await Country.sync();
  await Currency.sync();
};

// Perform a bulk write
const load = async () => {
  await Country.bulkCreate(initialCountries);
  await Currency.bulkCreate(initialCurrencies);
};


// Clears all test tables in the database
const clearData = async () => {
  await Currency.destroy({
    // where: {},
    truncate: true
  });
  await Country.destroy({
    where: {},
    // truncate: true
  });
};

module.exports = {
  initialCurrencies,
  initialCountries,
  currenciesInDb,
  init,
  load,
  clearData
};
