/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/**
 * Import all the related component(s) here:
 * 
 * 
 */
import CurrencyConvert from '../components/CurrencyConvert';

/**
 * we will test the conversion section that contains: currency code & amount input fields, 
 *   Convert button and converted amount text. 
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */

describe('<CurrencyConvert />', () => {

  it('Testing conversion section', async () => {
    const usdCurrency = {
      id: 1,
      currencyCode: 'USD',
      conversionRate: 0.75
    };

    const gbpCurrency = {
      id: 2,
      currencyCode: 'GBP',
      conversionRate: 0.58
    };
    // convertCurrency is a mock function now
    // const convertCurrency = jest.fn();
    const user = userEvent.setup();
    render(<CurrencyConvert currencyFrom={usdCurrency} currencyTo={gbpCurrency} />);

    // Your code here
    // Check if Currency From is set
    const inputCurrencyFrom = screen.getByLabelText('Currency From');
    expect(inputCurrencyFrom).toHaveDisplayValue(usdCurrency.currencyCode);

    // Check if Currency To is set
    const inputCurrencyTo = screen.getByLabelText('Currency To');
    expect(inputCurrencyTo).toHaveDisplayValue(gbpCurrency.currencyCode);

    
    // Type the 200 to the Amount Input
    const inputAmountFrom = screen.getByLabelText('Amount');
    await user.type(inputAmountFrom, '200');
    expect(inputAmountFrom).toHaveDisplayValue('200');

    // Click the butto to convert
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    await user.click(button);

    // Check if the converted amount was set correctly
    const inputAmountTo = screen.getByLabelText('Converted Amount');
    expect(inputAmountTo).toHaveDisplayValue('155');
    
  });
});
