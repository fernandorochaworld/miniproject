import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import convertCurrency from '../utils/currency_utils';

const CurrencyConvert = ({currencyFrom, currencyTo}) => {

  // const [processing, setProcessing] = useState(false);
  const [processing] = useState(false);
  const [data, setData] = useState({
    amountFrom: 0,
    amountTo: 0,
  });

  function handleFieldChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  function handleClickConvert() {
    const amountTo = convertCurrency(currencyFrom, currencyTo, parseFloat(data.amountFrom));
    setData({
      ...data,
      amountTo
    });
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Convert</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form className="space-y-6" action="#" method="POST">

          <div className="flex flex-row space-x-4">
            <Input type="text" name="currencyCodeFrom" title="Currency From" value={currencyFrom?.currencyCode || ''} disabled={true} />
            <Input type="text" name="currencyCodeTo" title="Currency To" value={currencyTo?.currencyCode || ''} disabled={true} />
            <Input type="number" name="amountFrom" title="Amount" value={data.amountFrom} onChange={(e) => handleFieldChange(e)} />
            <Input type="number" name="amountTo" title="Converted Amount" value={data.amountTo} disabled={true} />
          </div>

          <div className="flex justify-end">
            <Button className="w-40" title="Convert" disabled={processing || !currencyFrom?.id || !currencyTo?.id} onClick={handleClickConvert} />
          </div>
        </form>
      </div>
    </div>
  );
};

CurrencyConvert.propTypes = {
  currencyFrom: PropTypes.object,
  currencyTo: PropTypes.object,
};

export default CurrencyConvert;
