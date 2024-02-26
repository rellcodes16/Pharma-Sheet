import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"

function InventoryOperations() {
  return (
    <div className="flex items-center gap-4">
        <Filter filterField='status' options={[
            {value: 'all', label: 'All'},
            {value: 'filled', label: 'Filled'},
            {value: 'limited', label: 'Limited'},
            {value: 'empty', label: 'Empty'},
        ]}/>

        <SortBy options={[
            {value: 'unitPrice-asc', label: 'Sort Price (Low First)'},
            {value: 'unitPrice-desc', label: 'Sort Price (High First)'}
        ]}/>
    </div>
  )
}

export default InventoryOperations