import Button from "./Button";
import Input from "./Input";

const Login = () => {
  function handleClick() {
    alert('abc')
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-3 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <Input type="email" name="email" title="Email address" />

          <Input type="password" name="PPP" title="Pass" />

          <div class="flex flex-row space-x-4">
            <Button title="Login" onClick={handleClick} />
            <Button title="Sign up" onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
