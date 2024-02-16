
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
        throw new Error(`${key} is missing`);
      }
    });
  
    // Validate existing record
    if (currencies.find((item) => item.currencyCode === currency.currencyCode)) {
      throw new Error("Currency already exists.");
    }
  }


  module.exports = {
    currencies,
    currencyAutoIncrementId,
    findCurrency,
    currencyValidation,
  }