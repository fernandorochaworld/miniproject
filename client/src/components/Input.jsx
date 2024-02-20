import { useState } from "react";

const Input = ({type, name, title, value, className, disabled, onChange}) => {
  
  const [val, setVal] = useState(value || '');

  function handleChange(e) {
    setVal(e.target.value);
    if (onChange) onChange(e);
  }

  const myClass = `${className} block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
  return (
    <div class="w-full">
      <label for={name} class="block text-sm font-medium leading-6 text-gray-900">{title}</label>
      <div class="mt-2">
        <input id={name} name={name} type={type} value={value} required className={myClass} disabled={(disabled)? "disabled" : ""} onChange={handleChange} />
      </div>
    </div>
  );
}

export default Input;
