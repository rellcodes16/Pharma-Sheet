import { createContext, useContext, useState } from "react"

const SearchContext = createContext()

function SearchProvider({ children }) {
    const [searchResult, setSearchResult] = useState([]);
  return (
    <SearchContext.Provider value={{
        searchResult,
        setSearchResult
    }}>
        {children}
    </SearchContext.Provider>
  )
}

function useSearch(){
    const context = useContext(SearchContext)
    if(context === undefined) 
        throw new Error ('SearchContext was called outside the SearchProvider')
    return context;
}

export {SearchProvider, useSearch }