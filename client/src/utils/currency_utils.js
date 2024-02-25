/**
 * This file is meant to be where you will complete the utility function below, for performing a conversion of some amount
 * to another currency.
 */

/**
 * TODO:
 * @receives two currency objects, currencyA and currencyB, as well as an integer-amount of cash in currencyA
 * @performs a currency conversion between integer amount of currencyA to an integer amount of currencyB
 * @returns an integer
 */
const convertCurrency = (currencyA, currencyB, amountA) => {
  if (!currencyA?.conversionRate || !currencyB?.conversionRate) {
    throw new Error('Invalid Currency');
  }
  if (typeof amountA !== 'number') {
    throw new Error('Invalid Amounth');
  }
  const rateA = currencyA.conversionRate;
  const rateB = currencyB.conversionRate;
  const amountB = (1 / rateA) * amountA * rateB;
  return Math.round(amountB);
};

export default convertCurrency;
