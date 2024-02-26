import { useSearchParams } from "react-router-dom"

function Filter({ filterField, options }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentFilterItem = searchParams.get(filterField) || options.at(0).value

    function handleClick(value){
        searchParams.set(filterField, value)
        setSearchParams(searchParams)
    }

  return (
    <div className="flex gap-2">
        {options.map((option) => 
        <div
          className={`border border-solid text-black dark:text-gray-300 dark:border-gray-500 shadow-sm rounded-full py-1 px-3 cursor-pointer ${option.value === currentFilterItem && 'bg-green-600 dark:bg-green-800'}`}  
          key={option.value} 
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilterItem}
        >
          {option.label}
        </div>
      )}
    </div>
  )
}

export default Filter