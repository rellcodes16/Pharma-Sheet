import SignupForm from "../features/Authentication/SignUpForm"

const Users = () => {
  return (
    <div>
      <h1 className="text-3xl text-gray-600 dark:text-gray-300">Create a new user</h1>
      <p className="text-gray-600 mb-7 italic dark:text-gray-300">Note that, accounts are strictly for sales representatives and employees ONLY.</p>

      <SignupForm />
    </div>
  )
}

export default Users