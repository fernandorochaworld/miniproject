
  
function attributesValidation(currency) {
  // Validate attributes
  Object.keys(currency).forEach((key) => {
    if (!currency[key]) {
      throw new Error(`${key} is missing`);
    }
  });
}


module.exports = {
  attributesValidation,
};