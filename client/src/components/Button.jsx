
const Button = ({ type, title, onClick, color, className, value, disabled }) => {
  // const styleColor = color || 'sky';
  return (
    <button
      value={value}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled ? "disabled" : ""}
      className={`flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600`}>
      {title}
    </button>
  );
}

export default Button;
