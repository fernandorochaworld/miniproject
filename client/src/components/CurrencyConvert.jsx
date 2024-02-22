import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const CurrencyConvert = ({currency}) => {
  function handleClick() {
    alert('abc')
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Convert</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form className="space-y-6" action="#" method="POST">

          <div className="flex flex-row space-x-4">
            <Input type="text" name="currencyCode" title="Currency Code" value={currency?.currencyCode || ''} disabled={true} />
            <Input type="number" name="amount" title="Amount" />
            <Input type="number" name="amountConverted" title="Amount Converted" disabled={true} />
          </div>

          <div className="flex justify-center">
            <Button className="w-1/3" title="Convert" onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CurrencyConvert;
