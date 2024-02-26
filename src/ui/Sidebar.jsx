import { Link } from "react-router-dom"
import Logo from "./Logo"
import MainNav from "./MainNav"

const Sidebar = () => {
  return (
    <aside className="pt-8 row-span-full sm:max-w-[300px] dark:bg-slate-800 overflow-auto">
      <Logo />
      <MainNav />
    </aside>
  )
}

export default Sidebar