import Login from './Login';
import CurrencyAdd from './CurrencyAdd';
import CurrencyConvert from './CurrencyConvert';
import CurrencyDelete from './CurrencyDelete';
import CurrencyUpdate from './CurrencyUpdate';
import CurrencyIndex from './CurrencyIndex';
import React, { useState } from 'react';

const App = () => {

  const [currency, setCurrency] = useState();
  const [currencyTo, setCurrencyTo] = useState();
  const [countUpdate, setCountUpdate] = useState(1);

  function handleSelecteCurrency(item) {
    console.log('handleSelecteCurrency', item);
    setCurrency(item);
  }

  function handleSelecteCurrencyTo(item) {
    console.log('handleSelecteCurrencyTo', item);
    setCurrencyTo(item);
  }

  function handleReloadIndex() {
    setCountUpdate(countUpdate + 1);
  }

  return (
    <>
      <Login />
      <CurrencyIndex handleSelecteCurrency={handleSelecteCurrency} handleSelecteCurrencyTo={handleSelecteCurrencyTo} key={countUpdate} />
      
      {
        currency &&
        <div className="text-amber-600 text-center text-2xl mt-4">
          Selected Currency: &nbsp;
          <span className='text-4xl font-bold'>
            {currency?.currencyCode} - {currency?.country?.name} 
          </span>
          <br />
          {
            currencyTo &&
            <span>
              Convert to&nbsp;
              <span className='text-4xl font-bold'>
                {currencyTo?.currencyCode} - {currencyTo?.country?.name}
              </span>
            </span>
          }
        </div>
      }

      <CurrencyAdd handleReloadIndex={handleReloadIndex} />
      <CurrencyConvert currencyFrom={currency} currencyTo={currencyTo} />
      <CurrencyUpdate currency={currency} reloadIndex={handleReloadIndex} />
      <CurrencyDelete currency={currency} reloadIndex={handleReloadIndex} handleItemSelected={handleSelecteCurrency} />
    </>
  );
};

export default App;
