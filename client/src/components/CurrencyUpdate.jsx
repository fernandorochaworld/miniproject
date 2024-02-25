import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';


async function updateCurrency(id, rate) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch(`${import.meta.env.VITE_API_URL}/currency/${id}/${rate}`, requestOptions);
  const data = await response.json();
  return data;
}


CurrencyUpdate.propTypes = {
  currency: PropTypes.object,
  reloadIndex: PropTypes.func,
};
const CurrencyUpdate = ({ currency, reloadIndex }) => {

  const [processing, setProcessing] = useState(false);

  const [data, setData] = useState({
    conversionRate: 1,
  });

  async function handleUpdateClick() {
    setProcessing(true);

    const result = await updateCurrency(currency.id, data.conversionRate);
    if (result?.id) {
      alert(`New Currency Rate ${result.conversionRate}.`);
      reloadIndex();
    } else {
      alert('Error to save currency: ' + result?.error);
    }

    setProcessing(false);
  }

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update Currency</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form className="space-y-6" action="#" method="POST">

          <div className="flex flex-row space-x-4">
            <Input type="text" name="currencyCode" title="Currency Code" value={currency?.currencyCode || ''} disabled={true} />
            <Input type="number" name="conversionRate" title="conversion Rate" onChange={handleChange} />
          </div>

          <div className="flex justify-end">
            <Button className="w-40" title="Update" disabled={processing || !currency?.id} onClick={handleUpdateClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrencyUpdate;
