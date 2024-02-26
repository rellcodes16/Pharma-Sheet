import AddToSales from "../features/Sales/AddToSales"
import SalesOperations from "../features/Sales/SalesOperations"
import SalesTable from "../features/Sales/SalesTable"

const Sales = () => {
  return (
      <div>
        <h1 className="text-3xl text-gray-600 mb-5 italic">Sales</h1>
      <div className="sm:flex sm:justify-between">
        <SalesOperations />
        <div className="mt-5">
          <AddToSales />
        </div>
      </div>
      <SalesTable />
    </div>
  )
}

export default Sales