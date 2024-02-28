import { HiCheckBadge, HiCurrencyDollar, HiMiniBanknotes, HiMiniExclamationTriangle, HiXCircle } from 'react-icons/hi2'
import { useInventory } from '../Inventory/useInventory'
import SalesBarChart from './SalesBarChart'
import Spinner from '../../ui/Spinner'
import { useRecentSales } from './useRecentSales'
import { useExpense } from '../Expenses/useExpense'
import ExpensePieChart from './ExpensePieChart'
import { useGetInventory } from '../Inventory/useGetInventory'

function DashboardLayout() {
    const { inventory } = useGetInventory()
    const { expense } = useExpense()
    const { isLoading, sales, numDays } = useRecentSales()

    if(isLoading) return <Spinner/>

    const filled = inventory?.filter(data => data.status === 'Filled')
    console.log('filled', filled)
    const filledLength = filled?.length
    const limited = inventory?.filter(data => data.status === 'Limited')
    const limitedLength = limited?.length
    const empty = inventory?.filter(data => data.status === 'Empty')
    const emptyLength = empty?.length

    const grossProfits = sales.map(item => parseInt(item.totalPrice) - parseInt(item.totalCost));

    const totalGross = grossProfits.reduce((acc, curr) => acc + curr, 0);

    const expenseData = expense.map(data => data.expense_price)
    const totalExpense = expenseData.reduce((acc, curr) => acc + curr, 0)
    console.log(expenseData)

    const totalNet = totalGross - totalExpense

  return (
    <div>
        <div className="sm:flex sm:justify-between gap-3">
            <div className=" p-3 sm:mb-0 mb-3 w-[100%] rounded-xl text-gray-400 bg-white dark:bg-slate-800 flex gap-1">
                <HiCheckBadge className='text-8xl text-green-600 pt-3 self-center'/>
                <div className='self-center'>
                    <h1 className='text-center font-extrabold dark:text-gray-400 text-gray-800 text-2xl'>FILLED STOCK</h1>
                    <p className='text-center text-3xl dark:text-gray-400 text-gray-800'>{filledLength}</p>
                </div>
            </div>
            <div className="p-3 sm:mb-0 mb-3  w-[100%] rounded-xl bg-white text-gray-400 dark:bg-slate-800 flex gap-1">
                <HiMiniExclamationTriangle className='text-8xl text-yellow-500 pt-3 self-center'/>
                <div className='self-center'>
                    <h1 className='text-center font-extrabold dark:text-gray-400 text-gray-800 text-2xl'>LIMITED STOCK</h1>
                    <p className='text-center text-3xl dark:text-gray-400 text-gray-800'>{limitedLength}</p>
                </div>
            </div>
            <div className="p-3 sm:mb-0 mb-3  w-[100%] rounded-xl bg-white text-gray-400 dark:bg-slate-800 flex gap-1">
                <HiXCircle className='text-8xl text-red-500 pt-3 self-center'/>
                <div className='self-center'>
                    <h1 className='text-center font-extrabold dark:text-gray-400 text-gray-800 text-2xl'>EMPTY STOCK</h1>
                    <p className='text-center text-3xl dark:text-gray-400 text-gray-800'>{emptyLength}</p>
                </div>
            </div>
        </div>
        <div className='sm:flex gap-5 mt-5'>
            <div className='w-full rounded-lg sm:flex sm:mb-0 mb-3 gap-3'>
                <div className="dark:bg-slate-800 sm:mb-0 mb-3 w-full rounded-xl bg-white flex flex-col items-center">
                    <HiCurrencyDollar className='text-9xl text-yellow-700 pt-3'/>
                    <h1 className='uppercase dark:text-gray-400 text-gray-800 font-bold text-2xl'>GROSS PROFIT</h1>
                    <h1 className='dark:text-gray-400 text-gray-800 font-bold text-2xl'>${totalGross}</h1>
                </div>
                <div className="dark:bg-slate-800 w-full rounded-xl flex flex-col bg-white items-center">
                    <HiMiniBanknotes className='text-9xl text-green-600 pt-3'/>
                    <h1 className='uppercase dark:text-gray-400 text-gray-800 font-bold text-2xl'>net PROFIT</h1>
                    <h1 className='dark:text-gray-400 text-gray-800 font-bold text-2xl'>${totalNet}</h1>
                </div>
            </div>
            <div className=' dark:bg-slate-800 w-full bg-white rounded-lg p-5'>
                <ExpensePieChart />
            </div>
        </div>
        <div className='my-10'>
            <div className='text-gray-400 dark:bg-slate-800 bg-white w-full rounded-lg p-5'>
                <SalesBarChart sales={sales} numDays={numDays}/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout