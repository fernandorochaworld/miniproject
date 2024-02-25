import React from 'react';
import Button from './Button';
import Input from './Input';

const Login = () => {
  function handleClick() {
    alert('abc');
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <Input type="username" name="username" title="Username" />

          <Input type="password" name="password" title="Password" />

          <div className="flex flex-row space-x-4">
            <Button title="Login" onClick={handleClick} />
            <Button title="Sign up" onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
