import { useSearchParams } from "react-router-dom"
import SortSelect from "./SortSelect"

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get('sortBy') || ""

    function handleSortBy(e){
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }
  return (
    <SortSelect options={options} value={sortBy} onChange={handleSortBy}/>
  )
}

export default SortBy