import { HiSearch } from "react-icons/hi"
import Modal from "../../ui/Modal"
import SearchHistoryForm from './SearchHistoryForm'
import { useSearch } from "../../services/SearchContext"

function SearchHistory() {
  const { setSearchResult } = useSearch()

  return (
    <Modal>
        <Modal.Open openModalName='historysearch-name'>
            <button className=" bg-none p-2 text-2xl text-gray-500"><HiSearch /></button>
        </Modal.Open>
        <Modal.Window name='historysearch-name'>
            <SearchHistoryForm setSearchResult={setSearchResult}/>
        </Modal.Window>
    </Modal>
  )
}

export default SearchHistory

