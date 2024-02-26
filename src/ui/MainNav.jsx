import { NavLink } from "react-router-dom"
import { HiOutlineCalendar, HiOutlineChartBar, HiOutlineHome, HiOutlineShoppingCart, HiOutlineUser } from 'react-icons/hi'
import { HiOutlineBanknotes } from "react-icons/hi2"

const MainNav = () => {
  return (
    <nav>
        <ul className="flex flex-col gap-8 mt-12 ml-5 text-gray-700 dark:text-gray-300">
            <li>
                <NavLink to='dashboard' className="flex items-center gap-4 text-2xl font-bold sm:py-[0.7rem] md:py-[0.7rem] sm:px-[2.4rem] md:px-[2.4rem] transition-all"><HiOutlineHome /><span className="hidden sm:block">Home</span></NavLink>
            </li>
            <li>
                <NavLink to='inventory' className="flex items-center gap-4 text-2xl font-bold sm:py-[0.7rem] sm:px-[2.4rem] md:px-[2.4rem] md:py-[0.7rem] transition-all"><HiOutlineShoppingCart /><span className="hidden sm:block">Inventory</span></NavLink>
            </li>
            <li>
                <NavLink to='sales' className="flex items-center gap-4 text-2xl font-bold sm:py-[0.7rem] sm:px-[2.4rem] md:px-[2.4rem] md:py-[0.7rem] transition-all"><HiOutlineChartBar /><span className="hidden sm:block">Sales</span></NavLink>
            </li>
            <li>
                <NavLink to='expense' className="flex items-center gap-4 text-2xl font-bold sm:py-[0.7rem] sm:px-[2.4rem] md:px-[2.4rem] md:py-[0.7rem] transition-all"><HiOutlineBanknotes /><span className="hidden sm:block">Expenses</span></NavLink>
            </li>
            <li>
                <NavLink to='history' className="flex items-center gap-4 text-2xl font-bold sm:py-[0.7rem] sm:px-[2.4rem] md:px-[2.4rem] md:py-[0.7rem] transition-all"><HiOutlineCalendar /><span className="hidden sm:block">History</span></NavLink>
            </li>
            <li>
                <NavLink to='users' className="flex items-center gap-4 text-2xl font-bold sm:py-[0.7rem] sm:px-[2.4rem] md:px-[2.4rem] md:py-[0.7rem] transition-all"><HiOutlineUser /><span className="hidden sm:block">Users</span></NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default MainNav