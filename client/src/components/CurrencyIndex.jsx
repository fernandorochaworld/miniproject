import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from './Button';

const selectItem = (list, id) => list.find(item => item.id == id);

const CurrencyIndex = ({ handleSelecteCurrency, handleSelecteCurrencyTo }) => {

  const [list, setList] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/currency`)
      .then(res => res.json())
      .then(data => {
        setList(data);
      });
  }, []);

  function handleClick(e) {
    const id = e.target.value;
    const item = list.find(item => item.id == id);
    console.log('item', item);
    handleSelecteCurrency(item);
  }

  function handleClickTo(e) {
    const id = e.target.value;
    const item = selectItem(list, id);
    handleSelecteCurrencyTo(item);
  }

  function handleClickClear() {
    handleSelecteCurrency(null);
    handleSelecteCurrencyTo(null);
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 pb-3 pt-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-screen-md rounded overflow-hidden shadow-lg p-3">
        <div className="text-center text-amber-600">
          * Select one currency to perform the convert, update, and delete opperations.
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Select One Currency </h2>
        </div>

        <div className="flex flex-wrap mt-10 space-y-1 sm:mx-auto sm:w-full sm:max-w-screen-md">
          <div className="flex flex-row w-full space-x-4" key="header">
            <div className="w-1/4 font-bold">Currency Code</div>
            <div className="w-1/4 font-bold">Rate</div>
            <div className="w-1/4 font-bold">Country</div>
            <div className="w-24 font-bold">Options</div>
          </div>
          {list && list.map(item => (
            <div className="flex flex-row w-full space-x-4" key={item.id}>
              <div className="w-1/4">{item.currencyCode}</div>
              <div className="w-1/4">{item.conversionRate}</div>
              <div className="w-1/4">{item.country.name}</div>
              <Button className="w-12" title="Select" value={item.id} onClick={(e) => handleClick(e)} color="green" />
              <Button className="w-12" title="To" value={item.id} onClick={(e) => handleClickTo(e)} color="green" />
            </div>
          ))}
          <div className="flex w-full justify-center">
            <Button className="w-40" title="Unselect Currencies" value={0} onClick={handleClickClear} color="amber" />
          </div>

        </div>

        {/* <div>
        <label for="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" className="sr-only">Currency</label>
              <select id="currency" name="currency" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
              </select>
            </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

CurrencyIndex.propTypes = {
  handleSelecteCurrency: PropTypes.func,
  handleSelecteCurrencyTo: PropTypes.func,
};

export default CurrencyIndex;
