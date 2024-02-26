import { createContext, useContext } from "react"
import Empty from "./Empty"

const TableContext = createContext()

function Table({ children }) {
  return (
    <TableContext.Provider value={{}}>
       <div>{children}</div>
    </TableContext.Provider>
  )
}

function Header({ children, className, style }){
    return(
        <div role="row" className={className} style={style}>
            {children}
        </div>
    )
}
function Row({ children, className, style }){
    return(
        <div role="row" className={className} style={style}>
            {children}
        </div>
    )
}

function Body({ data, render, className }){
    if(!data.length) return <Empty>No data to display at the moment</Empty>
    return(
        <section role="row" className={className}>
            {data.map(render)}
        </section>
    )
}

function Footer({ children }){
    return(
        <section>
            {children}
        </section>
    )
}

Table.Header = Header
Table.Row = Row
Table.Body = Body
Table.Footer = Footer

export default Table