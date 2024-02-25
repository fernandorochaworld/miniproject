import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

const CurrencyConvert = ({currency}) => {

  // const [processing, setProcessing] = useState(false);
  const [processing] = useState(false);

  function handleClick() {
    alert('abc');
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Convert</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form className="space-y-6" action="#" method="POST">

          <div className="flex flex-row space-x-4">
            <Input type="text" name="currencyCodeFrom" title="Currency Code From" value={currency?.currencyCode || ''} disabled={true} />
            <Input type="text" name="currencyCodeTo" title="Currency Code To" value={''} disabled={true} />
            <Input type="number" name="amount" title="Amount" />
          </div>

          <div className="flex justify-end">
            <Button className="w-40" title="Convert" disabled={processing || !currency?.id} onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

CurrencyConvert.propTypes = {
  currency: PropTypes.object,
};

export default CurrencyConvert;
