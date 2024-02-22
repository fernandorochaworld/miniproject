import { useState } from "react";
import Button from "./Button";
import Input from "./Input";


async function updateCurrency(id, rate) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch(`http://localhost:3001/api/currency/${id}/${rate}`, requestOptions);
  const data = await response.json();
  return data;
}

const CurrencyUpdate = ({ currency, reloadIndex }) => {

  const [data, setData] = useState({
    conversionRate: 1,
  });

  async function handleClick() {
    const result = await updateCurrency(currency.id, data.conversionRate);
    if (result?.id) {
      alert(`New Currency Rate ${result.conversionRate}.`);
      reloadIndex();
    } else {
      alert('Error to save currency: ' + result?.error)
    }
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

          <div className="flex justify-center">
            <Button className="w-1/3" title="Update" onClick={handleClick} disabled={!currency?.id} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CurrencyUpdate;
