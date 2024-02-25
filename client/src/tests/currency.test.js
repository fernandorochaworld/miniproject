import convertCurrency from '../utils/currency_utils';

/**
 * The tests below will be based on the following conversion amounts,
 * where $1 CDN (Canadian dollar) is equivalent to $0.75 USD (US dollar), 
 * and $0.58 GBP (British pounds). For ease of tests,
 * we have avoided putting any extraneous key-value pairs in the currency
 * objects, as we only need the conversion rate. 
 */

const cdnCurrency = {
  conversionRate: 1 
};

const usdCurrency = {
  conversionRate: 0.75
};

const gbpCurrency = {
  conversionRate: 0.58
};

/**
 * Tests follow the format of 
 * test('description', () => { ...your code here... })
 * Please read here: https://jestjs.io/docs/getting-started
 * for more information on using jest to perform testing
 */

/**
 * Test 1: Completed
 * This test performs a currency conversion, where it's really just the same currency
 * Therefore, we should return the same amount
 */
test('same currency conversion', () => {
  const result = convertCurrency(cdnCurrency, cdnCurrency, 100);
  expect(result).toBe(100);
});

/**
 * Test 2: Completed
 * Write a test that performs a currency conversion from CDN to GBP, for $100 CDN
 * Hint: the result should be $58 GBP according to our provided currencies.
 */
test('CDN to GBP conversion', () => {
  const result = convertCurrency(cdnCurrency, gbpCurrency, 100);
  expect(result).toBe(58);
});

/**
 * Test 3: Completed
 * Write a test that performs a currency conversion from CDN to USD, for $75 CDN
 */
test('CDN to USD conversion', () => {
  const result = convertCurrency(cdnCurrency, usdCurrency, 75);
  expect(result).toBe(56);
});

/**
 * Test 4: Completed
 * Write a test that performs a currency conversion from USD to GBP, for $200 USD
 */
test('USD to GBP conversion', () => {
  const result = convertCurrency(usdCurrency, gbpCurrency, 200);
  expect(result).toBe(155);
});

/**
 * Test 5: Completed
 * Write a test that performs a currency conversion from GBP to CDN, for $50 GBP
 */
test('GBP to CDN conversion', () => {
  const result = convertCurrency(gbpCurrency, cdnCurrency, 50);
  expect(result).toBe(86);
});

/**
 * Test Invalid Currency
 */
test('Invalid Currency', () => {
  const exceptionMessage = 'Invalid Currency';

  expect(() => convertCurrency({conversionRate: 0 }, cdnCurrency, 5)).toThrow(exceptionMessage);
  expect(() => convertCurrency({}, usdCurrency, 5)).toThrow(exceptionMessage);
  expect(() => convertCurrency(null, usdCurrency, 5)).toThrow(exceptionMessage);
  
  expect(() => convertCurrency(cdnCurrency, {conversionRate: 0 }, 5)).toThrow(exceptionMessage);
  expect(() => convertCurrency(usdCurrency, {}, 5)).toThrow(exceptionMessage);
  expect(() => convertCurrency(gbpCurrency, null, 5)).toThrow(exceptionMessage);
  expect(() => convertCurrency()).toThrow(exceptionMessage);
});


/**
 * Test Invalid Amounth
 */
test('Invalid Amounth', () => {
  const exceptionMessage = 'Invalid Amounth';

  const result1 = convertCurrency(usdCurrency, gbpCurrency, 0);
  expect(result1).toBe(0);
  
  expect(() => convertCurrency(usdCurrency, gbpCurrency, undefined)).toThrow(exceptionMessage);
  expect(() => convertCurrency(usdCurrency, gbpCurrency, null)).toThrow(exceptionMessage);
  expect(() => convertCurrency(usdCurrency, gbpCurrency, 'ABCD')).toThrow(exceptionMessage);
  expect(() => convertCurrency(usdCurrency, gbpCurrency)).toThrow(exceptionMessage);
});
