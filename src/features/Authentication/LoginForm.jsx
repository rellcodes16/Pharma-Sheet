import { useState } from "react";
import Button from "../../ui/Button";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin()

  if(isLoading) return <Spinner />

  function handleSubmit(e) {
    e.preventDefault()

    if(!email || !password) return toast.error('Please enter your login details');

    login({ email, password }, {
      onSettled: () => {
        setEmail('')
        setPassword('')
      },
      onError: () => {
        toast.error('Invalid Login Details. Please Try Again')
      }
    })

  }

  return (
    <form className="p-6 grid gap-y-5" onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black rounded-lg w-[260px] px-3"
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black rounded-lg w-[260px] px-3"
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button type="primary" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </form>
  );
}

export default LoginForm;
