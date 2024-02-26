import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../utils/helpers"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"
import Button from "./Button"

function Pagination({ count }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const pageCount = Math.ceil(count / PAGE_SIZE)

    const handleNextPage = () => {
      const next = currPage === pageCount ? currPage : currPage + 1
      searchParams.set('page', next)
      setSearchParams(searchParams)
    }

    const handlePrevPage = () => {
      const prev = currPage === 1 ? currPage : currPage - 1
      searchParams.set('page', prev)
      setSearchParams(searchParams)
    }

    if(pageCount <= 1) return null;
  return (
    <div className="text-center text-gray-500 my-5">
      <p>
        Displaying <span>{(currPage - 1) * PAGE_SIZE + 1}</span> - <span>{currPage === pageCount  ? count : currPage * PAGE_SIZE}</span> of <span>{count}</span> results
      </p>
      <div className="flex gap-10 justify-center mt-4">
        <Button type={currPage === 1 ? 'disabled' : 'primary'} onClick={handlePrevPage} disabled={currPage === 1}>
          <HiChevronLeft /> 
        </Button>
        <Button type={currPage === pageCount ? 'disabled' : 'primary'} onClick={handleNextPage} disabled={currPage === pageCount}>
          <HiChevronRight /> 
        </Button>
      </div>
    </div>
  )
}

export default Pagination