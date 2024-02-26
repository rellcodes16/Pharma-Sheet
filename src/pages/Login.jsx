import Logo from '../ui/Logo'
import LoginForm from '../features/Authentication/LoginForm'

const Login = () => {
  return (
    <div className='flex justify-center items-center flex-col h-[100vh] pt-20 dark:bg-slate-800'>
      <Logo />
      <LoginForm />
    </div>
  )
}

export default Login