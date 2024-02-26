import Table from "../../ui/Table"
import { convertTimestamp, formatCurrency } from "../../utils/helpers"


const HistoryRow = ({ historyItem }) => {
    const { id: historyId, medName, clientName, batchNo, price, dateAndTime, dosage, totalPrice, costPrice, totalCost } = historyItem

    console.log(historyItem)

    
  return (
    <Table.Row role='row' className="grid sm:gap-2 gap-5 p-3 dark:bg-slate-800 dark:text-gray-300 dark:border-gray-600 items-center min-w-[1800px] bg-gray-50 border border-solid text-center border-gray-100 font-bold text-gray-600 sm:py-[0.8rem] sm:px-[1rem]" style={{ gridTemplateColumns: '2fr 1.1fr 1.7fr 1.1fr 1.1fr 1.5fr 1fr 1.1fr 1.1fr 0.2fr'}}>
        <p className="min-w-[170px]">{medName}</p>
        <p className="min-w-[120px]">{clientName}</p>
        <p className="min-w-[200px]">{batchNo}</p>
        <p className="min-w-[200px]">{price}</p>
        <p className="min-w-[200px]">{costPrice}</p>
        <p className="min-w-[120px]">{convertTimestamp(dateAndTime)}</p>
        <p className="min-w-[200px]">{dosage}</p>
        <p className="min-w-[120px]">{formatCurrency(totalCost)}</p>                    
        <p className="min-w-[120px]">{formatCurrency(totalPrice)}</p>                    
    </Table.Row>
  )
}

export default HistoryRow