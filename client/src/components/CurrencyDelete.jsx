import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';


async function deleteCurrency(currencyId, countryId) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };
  const responseCurrency = await fetch(`${import.meta.env.VITE_API_URL}/currency/${currencyId}`, requestOptions);
  if (!responseCurrency.ok) {
    return responseCurrency;
  }
  const responseCountry = await fetch(`${import.meta.env.VITE_API_URL}/country/${countryId}`, requestOptions);
  return responseCountry;
}

CurrencyDelete.propTypes = {
  currency: PropTypes.object,
  reloadIndex: PropTypes.func,
  handleItemSelected: PropTypes.func,
};
const CurrencyDelete = ({currency, reloadIndex, handleItemSelected}) => {
  const [processing, setProcessing] = useState(false);

  async function handleDeleteClick() {
    setProcessing(true);

    const response = await deleteCurrency(currency.id, currency.country.id);
    if (response.ok) {
      alert('Successfully Deleted: ' + `${response.status} ${response.statusText}`);
      handleItemSelected(null);
      reloadIndex();
    } else {
      alert('Error While Deleting: ' + `${response.status} ${response.statusText}`);
    }

    setProcessing(false);
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Delete Currency</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form className="space-y-6" action="#" method="POST">

          <div className="flex flex-row space-x-4">
            <Input type="text" name="currencyCode" title="Currency Code" value={currency?.currencyCode || ''} disabled={true} />
          </div>

          <div className="flex justify-end">
            <Button className="w-40" title="Delete" disabled={processing || !currency?.id} onClick={handleDeleteClick} color="red" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrencyDelete;
