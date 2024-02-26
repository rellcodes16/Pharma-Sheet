import ExpenseList from '../features/Expenses/ExpenseList'
import { SearchProvider } from '../services/SearchContext'
import AddToExpense from '../features/Expenses/AddToExpense'

function Expense() {
  return (
    <div className='p-5'>
      <h1 className="text-3xl text-gray-600 mb-5 italic">Expenses</h1>
        <SearchProvider>
          <div className='grid justify-start'>
            <AddToExpense />
          </div>
            <ExpenseList />
        </SearchProvider>
    </div>
  )
}

export default Expense