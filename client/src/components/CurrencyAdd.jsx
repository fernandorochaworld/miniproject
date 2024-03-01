import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

async function addCountry(country) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(country)
  };
  const response = await fetch(`${import.meta.env.VITE_API_URL}/country`, requestOptions);
  let data = await response.json();
  return data;
}

async function removeCountry(countryId) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(`${import.meta.env.VITE_API_URL}/country/${countryId}`, requestOptions);
  return response.status;
}

async function addCurrency(currency) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currency)
  };
  const response = await fetch(`${import.meta.env.VITE_API_URL}/currency`, requestOptions);
  const data = await response.json();
  return data;
}

const currencyInitialData = {
  currencyCode: '',
  countryName: '',
  conversionRate: 1,
};


const CurrencyAdd = ({handleReloadIndex}) => {

  const [data, setData] = useState(currencyInitialData);
  const [processing, setProcessing] = useState(false);

  async function handleAddClick() {
    setProcessing(true);

    const country = await addCountry({name: data.countryName});
    console.log('Country', country);

    if (country?.id) {
      const currency = await addCurrency({
        currencyCode: data.currencyCode,
        conversionRate: data.conversionRate,
        countryId: country.id,
      });
      if (currency?.id) {
        setData(currencyInitialData);
        alert(`New Currency ${currency.currencyCode}.`);
        handleReloadIndex();
      } else {
        const status = await removeCountry(country.id);
        alert('Error to save currency: ' + currency?.error);
        if (status !== 204) {
          alert('Error to remove country');
        }
      }
    } else {
      alert('Error to save country: ' + country?.error);
    }
    setProcessing(false);
  }

  function handleFieldChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add Currency</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form className="space-y-6" action="#" method="POST">

          <div className="flex flex-row space-x-4">
            <Input type="text" name="currencyCode" title="Currency Code" value={data.currencyCode} onChange={handleFieldChange} />
            <Input type="text" name="countryName" title="Country Name" value={data.countryName} onChange={handleFieldChange} />
            <Input type="number" name="conversionRate" title="Conversion Rate" value={data.conversionRate} onChange={handleFieldChange} />
          </div>

          <div className="flex justify-end">
            <Button className="w-40" title="Add" disabled={processing} onClick={handleAddClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

CurrencyAdd.propTypes = {
  handleReloadIndex: PropTypes.func,
};

export default CurrencyAdd;
