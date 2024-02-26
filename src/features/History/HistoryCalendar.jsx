import Calendar from 'react-calendar'
import { List, Menu, Toggle } from '../../ui/Menu'
import { useState } from 'react';

function HistoryCalendar({ selectedDate, setSelectedDate}) {

    const handleDateChange = date => {
        setSelectedDate(date); // Pass selected date to parent component
    };
    
  return (
    <div className='text-end'>
        <Menu>
            <Toggle name='menu'/>
            <List name='menu'>
               <Calendar value={selectedDate} onChange={handleDateChange} className="custom-calendar bg-white dark:bg-slate-800 dark:text-green-400 text-green-900 shadow-md rounded-md p-4 w-[270px]"/>
            </List>
        </Menu>
    </div>
  )
}

export default HistoryCalendar
