import { useState } from "react"
import AddToInventory from "../features/Inventory/AddToInventory"
import InventoryOperations from "../features/Inventory/InventoryOperations"
import InventoryTable from "../features/Inventory/InventoryTable"
import { SearchProvider } from "../services/SearchContext"
import SearchInventory from "../features/Inventory/SearchInventory"

const Inventory = () => {

  return (
    <SearchProvider>
      <h1 className="text-3xl text-gray-600 mb-5 italic">Inventory</h1>
      <div className="pb-20">
        <div className="text-black sm:text-end">
          <InventoryOperations />
          <div className="mt-5">
            <SearchInventory/>
            <AddToInventory />
          </div>
        </div>
        <InventoryTable/>
      </div>
    </SearchProvider>
  )
}

export default Inventory
