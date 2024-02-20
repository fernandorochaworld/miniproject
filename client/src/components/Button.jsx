
const Button = ({ type, title, onClick, color, className, value }) => {
  const styleColor = color || 'indigo';
  const myClass = `${className} flex w-full justify-center rounded-md bg-${styleColor}-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-${styleColor}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${styleColor}-600`;
  return (
    <button
      value={value}
      type={type || 'button'}
      onClick={onClick}
      className={myClass}>
      {title}
    </button>
  );
}

export default Button;
