import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import { useDarkMode } from "../features/context/ColorModeToggle"
import IconButton from "./IconButton"

function AppColorMode() {
  const { isDarkMode, toggleMode } = useDarkMode()

  return (
    <IconButton onClick={toggleMode}>
        {isDarkMode ? (<HiOutlineSun className="text-gray-600 dark:text-gray-300 text-2xl cursor-pointer hover:text-green-600 active:text-green-600"/>) : (<HiOutlineMoon className="text-gray-600 text-2xl cursor-pointer hover:text-green-600 active:text-green-600"/>)}
    </IconButton>
  )
}

export default AppColorMode

