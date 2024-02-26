import SortBy from "../../ui/SortBy"

function SalesOperations() {
  return (
    <div className="flex items-center gap-4">
        <SortBy options={[
            {value: 'totalPrice-asc', label: 'Sort Price (Low First)'},
            {value: 'totalPrice-desc', label: 'Sort Price (High First)'},
        ]}/>
    </div>
  )
}

export default SalesOperations