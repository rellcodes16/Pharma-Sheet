import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import { useSearch } from "../../services/SearchContext"
import Pagination from "../../ui/Pagination"
import { useExpense } from "./useExpense"
import ExpenseCard from "./ExpenseCard"


const ExpenseList = () => {
    const { searchResult } = useSearch()

    const { isLoading, expense, count } = useExpense()

    if(isLoading) return <Spinner />

    let expenseToDisplay = searchResult.length > 0 ? searchResult : expense;
    
  return (
    <Table className="text-gray-100 border border-solid border-gray-200 text-2xl rounded-lg overflow-hidden">
        <Table.Header role="row" className="grid sm:gap-2 gap-5 p-3 items-center min-w-[500px] overflow-x-auto bg-gray-50 border border-solid dark:bg-slate-900 dark:text-gray-300 text-center rounded-tr-lg rounded-tl-lg border-gray-100 dark:border-gray-400 font-extrabold text-lg text-gray-900 sm:py-[1.4rem] sm:px-[2rem]" style={{ gridTemplateColumns: '0.3fr 1.8fr 1fr 0.5fr'}}>
            <div className="min-w-[50px]">No.</div>
            <div className="min-w-[180px]">Expense</div>
            <div className="min-w-[100px]">Price</div>
            <div></div>
        </Table.Header>

        <Table.Body data={expenseToDisplay} render={expenseItem => <ExpenseCard key={expenseItem.id} expenseItem={expenseItem}/>}/>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
    </Table>
  )
}

export default ExpenseList




