import { HiOutlineBookOpen } from "react-icons/hi"

const Logo = () => {
  return (
    <div className="flex font-bold text-xl text-center ml-4 flex-col">
        <img src="logo.png" alt="pharma-sheet-logo" className="w-20 self-center"/>
        <h1 className="hidden sm:block capitalize text-gray-700 text-3xl dark:text-gray-300">PharmaSheet</h1>
    </div>
  )
}

export default Logo