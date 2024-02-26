import { useSearch } from "../../services/SearchContext"
import Pagination from "../../ui/Pagination"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import HistoryRow from "./HistoryRow"
import { useHistory } from "./useHistory"

function HistoryTable({ selectedDate }) {
    const { history, isLoading, count } = useHistory()
    const { searchResult } = useSearch()

    if(isLoading) return <Spinner />

    const filteredHistory = history.filter(item => {
        const itemDate = new Date(item.dateAndTime);
        const localItemDate = new Date(itemDate.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
        console.log(localItemDate)
        return localItemDate.toDateString() === selectedDate.toDateString();
    });

    console.log('history', history)

    // console.log('historyData', historyData)
    let historyToDisplay = searchResult.length > 0 ? searchResult : filteredHistory;
    console.log(historyToDisplay)

  return (
    <Table className="text-gray-100 border border-solid border-gray-200 text-xl rounded-lg overflow-hidden">
    <Table.Header role="row" className="grid gap-2 items-center dark:bg-slate-900 dark:text-gray-300 dark:border-gray-400 bg-gray-50 border border-solid text-center border-gray-100 font-bold min-w-[1800px] text-gray-600 py-[1.2rem] px-[1rem]" style={{ gridTemplateColumns: '2fr 1.1fr 1.7fr 1fr 1.1fr 1.5fr 1fr 1.1fr 1.1fr 0.2fr'}}>
        <div className="min-w-[170px]">Med. Name</div>
        <div className="min-w-[120px]">Client Name</div>
        <div className="min-w-[200px]">Batch No.</div>
        <div className="min-w-[200px]">Cost Price</div>
        <div className="min-w-[200px]">Price</div>
        <div className="min-w-[120px]">Time</div>
        <div className="min-w-[200px]">Dosage</div>
        <div className="min-w-[120px]">Total Cost Price</div>
        <div className="min-w-[120px]">Total Price</div>
    </Table.Header>
    {/* {sales.map(salesItem => <SalesRow salesItem={salesItem} key={salesItem.id} />)} */}
    <Table.Body data={historyToDisplay} render={historyItem => <HistoryRow historyItem={historyItem} key={historyItem.id}/>}/>
</Table>
  )
}

export default HistoryTable
