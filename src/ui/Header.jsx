import Profile from "../features/Authentication/Profile"
import HeaderOptions from "./HeaderOptions"

const Header = () => {
  return (
    <div className="bg-stone-100 h-[80px] w-full px-4 flex justify-between dark:bg-slate-800">
      <Profile />
      <HeaderOptions />
    </div>
  )
}

export default Header
