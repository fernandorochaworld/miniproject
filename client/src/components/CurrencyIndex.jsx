import { useEffect, useState } from "react";
import Button from "./Button";

const CurrencyIndex = ({ handleItemSelected }) => {

  const [list, setList] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/api/currency')
      .then(res => res.json())
      .then(data => {
        setList(data);
      });
  }, [])

  function handleClick(e) {
    const id = e.target.value;
    const item = list.find(item => item.id == id)
    console.log('item', item);
    handleItemSelected(item);
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 pb-3 pt-8 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-screen-md rounded overflow-hidden shadow-lg p-3">
        <div class="text-center text-amber-600">
          * Select one currency to perform the convert, update, and delete opperations.
        </div>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Select One Currency </h2>
        </div>

        <div class="flex flex-wrap mt-10 space-y-1 sm:mx-auto sm:w-full sm:max-w-screen-md">

          {list && list.map(item => (
            <div class="flex flex-row w-full space-x-4">
              <div class="w-1/4">{item.currencyCode}</div>
              <div class="w-1/4">{item.conversionRate}</div>
              <div class="w-1/4">{item.country.name}</div>
              <Button className="w-1/6" title="Select" value={item.id} onClick={(e) => handleClick(e)} color="green" />
            </div>
          ))}
          <Button className="w-1/4" title="Unselect Currency" value={0} onClick={(e) => handleClick(e)} color="amber" />

        </div>

        {/* <div>
        <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
            <div class="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">Currency</label>
              <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
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
}

export default CurrencyIndex;
