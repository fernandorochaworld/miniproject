import Login from "./Login";
import CurrencyAdd from "./CurrencyAdd";
import CurrencyConvert from "./CurrencyConvert";
import CurrencyDelete from "./CurrencyDelete";
import CurrencyUpdate from "./CurrencyUpdate";
import CurrencyIndex from "./CurrencyIndex";
import { useState } from "react";

const App = () => {

  const [currency, setCurrency] = useState();

  function handleItemSelected(item) {
    console.log('llll', item)
    setCurrency(item);
  }

  return (
    <>
      <Login />
      <CurrencyIndex handleItemSelected={handleItemSelected} />
      
      {
        currency &&
        <div class="text-amber-600 text-center text-4xl font-bold mt-4">Selected Currency: {currency?.currencyCode} - {currency?.country?.name}</div>
      }
      <CurrencyAdd  />
      <CurrencyConvert currency={currency} />
      <CurrencyUpdate currency={currency} />
      <CurrencyDelete currency={currency} />
    </>
  );
}

export default App;
