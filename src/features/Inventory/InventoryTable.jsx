import { useSearchParams } from "react-router-dom"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import InventoryRow from "./InventoryRow"
import { useInventory } from "./useInventory"
import { useSearch } from "../../services/SearchContext"
import Pagination from "../../ui/Pagination"


const InventoryTable = () => {
    const { isLoading, inventory, count } = useInventory()
    const { searchResult } = useSearch()
    const[searchParams] = useSearchParams()

    if(isLoading) return <Spinner />

    console.log(inventory)

    const filterValue = searchParams.get('status') || 'all'

    let filteredInventory;
    if(filterValue === 'all') filteredInventory = inventory
    if(filterValue === 'filled') filteredInventory = inventory.filter(item => item.units >= 50)
    if(filterValue === 'limited') filteredInventory = inventory.filter(item => item.units < 50 && item.units !== 0)
    if(filterValue === 'empty') filteredInventory = inventory.filter(item => item.units === 0)

    const sortBy = searchParams.get('sortBy') || 'price.asc'
    const [field, direction] = sortBy.split('-')
    const sortModifier = direction === 'asc' ? 1 : -1
    const sortedInventory = filteredInventory.sort((a, b) => (a[field] - b[field]) * sortModifier)

    let inventoryToDisplay = searchResult.length > 0 ? searchResult : sortedInventory;
    
  return (
    <Table className="text-gray-100 border border-solid border-gray-200 text-2xl rounded-lg overflow-hidden">
        <Table.Header role="row" className="grid sm:gap-2 gap-5 p-3 min-w-[1000px] items-center bg-gray-50 border border-solid dark:bg-slate-900 dark:text-gray-300 text-center rounded-tr-lg rounded-tl-lg border-gray-100 dark:border-gray-400 font-extrabold text-lg text-gray-900 sm:py-[1.4rem] sm:px-[2rem]" style={{ gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr 0.5fr'}}>
            <div className="min-w-[200px]">Med. Name</div>
            <div className="min-w-[50px]">Units</div>
            <div className="min-w-[80px]">Unit Price</div>
            <div className="min-w-[80px]">Cost Price</div>
            <div className="min-w-[160px]">Status</div>
            <div></div>
        </Table.Header>

        {/* {inventory.map(inventoryItem => <InventoryRow inventoryItem={inventoryItem} key={inventoryItem.id} />)} */}

        <Table.Body data={inventoryToDisplay} render={inventoryItem => <InventoryRow inventoryItem={inventoryItem} key={inventoryItem.id}/>}/>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
    </Table>
  )
}

export default InventoryTable




