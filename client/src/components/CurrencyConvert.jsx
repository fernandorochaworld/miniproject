import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const CurrencyConvert = ({currency}) => {
  function handleClick() {
    alert('abc')
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Convert</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <form class="space-y-6" action="#" method="POST">

          <div class="flex flex-row space-x-4">
            <Input type="text" name="currencyCode" title="Currency Code" value={currency?.currencyCode || ''} disabled={true} />
            <Input type="number" name="amount" title="Amount" />
            <Input type="number" name="amountConverted" title="Amount Converted" disabled={true} />
          </div>

          <div class="flex justify-center">
            <Button className="w-1/3" title="Convert" onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CurrencyConvert;