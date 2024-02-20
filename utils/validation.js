
  
  function currencyValidation(currency) {
    // Validate attributes
    Object.keys(currency).forEach((key) => {
      if (!(key === "conversionRate" && currency[key] === 0) && !currency[key]) {
        throw new Error(`${key} is missing`);
      }
    });
  }


  module.exports = {
    currencyValidation,
  }