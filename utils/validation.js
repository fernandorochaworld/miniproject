
  
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
    currencyValidation,
  }