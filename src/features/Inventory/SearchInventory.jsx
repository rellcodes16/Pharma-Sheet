import { HiSearch } from "react-icons/hi"
import Modal from "../../ui/Modal"
import SearchInventoryForm from "./SearchInventoryForm"

function SearchInventory({ setSearchResult }) {
  return (
    <Modal>
        <Modal.Open openModalName='inventorysearch-name'>
            <button className=" bg-none p-2 text-2xl text-gray-500"><HiSearch /></button>
        </Modal.Open>
        <Modal.Window name='inventorysearch-name'>
            <SearchInventoryForm setSearchResult={setSearchResult}/>
        </Modal.Window>
    </Modal>
  )
}

export default SearchInventory
