import UpdateUserDataForm from "../features/Authentication/UpdateUserDataForm"
import UpdateUserPassword from "../features/Authentication/UpdateUserPassword"

function UpdateUserData() {
  return (
    <div className="h-full">
        <UpdateUserDataForm />
        <UpdateUserPassword />
    </div>
  )
}

export default UpdateUserData