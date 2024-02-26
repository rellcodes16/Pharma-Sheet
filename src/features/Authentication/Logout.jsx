import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useLogout } from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini"
import IconButton from "../../ui/IconButton"

function Logout() {
    const { logout, isLoading } = useLogout()

  return (
    <IconButton disabled={isLoading} onClick={logout}>
       {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle className="text-gray-600 dark:text-gray-300 text-2xl cursor-pointer hover:text-green-600 active:text-green-600"/> }
    </IconButton>
  )
}

export default Logout