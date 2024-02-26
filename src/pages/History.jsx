import { useState } from "react";
import HistoryCalendar from "../features/History/HistoryCalendar"
import HistoryTable from "../features/History/HistoryTable"
import SearchHistory from "../features/History/SearchHistory";
import { SearchProvider, useSearch } from "../services/SearchContext";


const History = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SearchProvider>
      <div className="pb-12">
        <h1 className="text-3xl text-gray-600 mb-5 italic">History</h1>
        <div className="flex gap-2 justify-between">
          <SearchHistory />
          <HistoryCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/> 
        </div>
        <HistoryTable selectedDate={selectedDate}/>
      </div>
    </SearchProvider>
  )
}

export default History