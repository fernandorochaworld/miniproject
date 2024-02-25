import Login from './Login';
import CurrencyAdd from './CurrencyAdd';
import CurrencyConvert from './CurrencyConvert';
import CurrencyDelete from './CurrencyDelete';
import CurrencyUpdate from './CurrencyUpdate';
import CurrencyIndex from './CurrencyIndex';
import React, { useState } from 'react';

const App = () => {

  const [currency, setCurrency] = useState();
  const [countUpdate, setCountUpdate] = useState(1);

  function handleItemSelected(item) {
    console.log('llll', item);
    setCurrency(item);
  }

  function handleReloadIndex() {
    setCountUpdate(countUpdate + 1);
  }

  return (
    <>
      <Login />
      <CurrencyIndex handleItemSelected={handleItemSelected} key={countUpdate} />
      
      {
        currency &&
        <div className="text-amber-600 text-center text-4xl font-bold mt-4">
          Selected Currency: {currency?.currencyCode} - {currency?.country?.name}
        </div>
      }

      <CurrencyAdd handleReloadIndex={handleReloadIndex} />
      <CurrencyConvert currency={currency} />
      <CurrencyUpdate currency={currency} reloadIndex={handleReloadIndex} />
      <CurrencyDelete currency={currency} reloadIndex={handleReloadIndex} handleItemSelected={handleItemSelected} />
    </>
  );
};

export default App;
