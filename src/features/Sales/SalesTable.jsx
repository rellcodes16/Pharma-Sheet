import { useSearchParams } from "react-router-dom"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import SalesRow from "./SalesRow"
import { useSales } from "./useSales"
import Pagination from "../../ui/Pagination"

const SalesTable = () => {
  const { sales, isLoading, count } = useSales()
  const [searchParams] = useSearchParams()
  
  console.log(sales)

  if(isLoading) return <Spinner />

  const sortBy = searchParams.get('sortBy') || 'totalPrice.asc'
  const [field, direction] = sortBy.split('-')
  const sortModifier = direction === 'asc' ? 1 : -1
  const sortedSales = sales.sort((a, b) => (a[field] - b[field])  * sortModifier)



  return (
    <Table className="text-gray-100 border border-solid border-gray-200 text-xl rounded-lg overflow-hidden">
        <Table.Header role="row" className="grid gap-2 items-center dark:bg-slate-900 dark:text-gray-300 dark:border-gray-400 bg-gray-50 border border-solid text-center border-gray-100 font-bold min-w-[1900px] text-gray-600 py-[1.2rem] px-[1rem]" style={{ gridTemplateColumns: '2fr 1.1fr 1.7fr 1.1fr 1fr 1.5fr 1fr 1.1fr 1.1fr 1.1fr 0.2fr'}}>
            <div className="min-w-[200px]">Med. Name</div>
            <div className="min-w-[120px]">Client Name</div>
            <div className="min-w-[200px]">Batch No.</div>
            <div className="min-w-[200px]">Cost Price</div>
            <div className="min-w-[200px]">Sell Price</div>
            <div className="min-w-[200px]">Quantity</div>
            <div className="min-w-[80px]">Time</div>
            <div className="min-w-[200px]">Dosage</div>
            <div className="min-w-[120px]">Cost Price</div>
            <div className="min-w-[120px]">Total Price</div>
            <div></div>
        </Table.Header>
        {/* {sales.map(salesItem => <SalesRow salesItem={salesItem} key={salesItem.id} />)} */}
        <Table.Body data={sortedSales} render={salesItem => <SalesRow salesItem={salesItem} key={salesItem.id}/>}/>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
    </Table>
  )
}

export default SalesTable