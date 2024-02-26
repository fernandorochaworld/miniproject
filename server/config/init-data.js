require('dotenv').config();

const Country = require('../models/Country');
const Currency = require('../models/Currency');

async function initCountry() {
  await Country.sync({ force: true });
  console.log('Country table created.');

  await Country.bulkCreate([
    {id: 1, name: 'Brazil'},
    {id: 2, name: 'Canada'},
    {id: 3, name: 'USA'},
  ]);
  console.log('Countries successfully added.');
}


async function initCurrency() {
  await Currency.sync({ force: true });
  console.log('Currency table created.');

  await Currency.bulkCreate([
    {currencyCode: 'BRL', countryId: 1, conversionRate: 3.6},
    {currencyCode: 'CDN', countryId: 2, conversionRate: 1},
    {currencyCode: 'USD', countryId: 3, conversionRate: 0.7},
  ]);
  console.log('Currencies successfully added.');
}

async function initData() {
  try {
    await initCountry();
    await initCurrency();
    console.log('DONE');
  } catch(e) {
    console.log('Error: ', e);
  }
}

initData();
