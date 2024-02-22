import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

async function addCountry(country) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(country)
  };
  const response = await fetch('http://localhost:3001/api/country', requestOptions);
  let data = await response.json();
  return data;
}

async function addCurrency(currency) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currency)
  };
  const response = await fetch('http://localhost:3001/api/currency', requestOptions);
  const data = await response.json();
  return data;
}

const CurrencyAdd = () => {

  const [data, setData] = useState({
    currencyCode: '',
    countryName: '',
    conversionRate: 1,
  });

  async function handleClick() {
    const country = await addCountry({name: data.countryName});
    console.log('Country', country);

    if (country?.id) {
      const currency = await addCurrency({
        currencyCode: data.currencyCode,
        conversionRate: data.conversionRate,
        countryId: country.id,
      });
      if (currency?.id) {
        alert(`New Currency ${currency.currencyCode}.`);
      } else {
        alert('Error to save currency: ' + currency?.error)
      }
    } else {
      alert('Error to save country: ' + country?.error)
    }
  }
  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add Currency</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form class="space-y-6" action="#" method="POST">

          <div class="flex flex-row space-x-4">
            <Input type="text" name="currencyCode" title="Currency Code" onChange={handleChange} />
            <Input type="text" name="countryName" title="country Name" onChange={handleChange} />
            <Input type="number" name="conversionRate" title="conversion Rate" onChange={handleChange} />
          </div>

          <div class="flex justify-center">
            <Button className="w-1/3" title="Add" onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CurrencyAdd;
