import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"


const AppLayout = () => {
  return (
    <div className="grid h-screen grid-layout overflow-hidden">
        <Sidebar />
        <Header />

        <main className={`overflow-auto bg-gray-100 dark:bg-slate-900 col-end-[-1] sm:py-10 sm:px-10 md:px-7 md:py-10 `}>
            <div className="max-w-[120rem] my-0 mx-[auto] p-5 h-full flex flex-col bg-gray-100 dark:bg-slate-900">
                <Outlet/>
            </div>
        </main>
    </div>
  )
}

export default AppLayout
