import { useState } from 'react'
import Calendar from 'react-calendar'

const CalendarPage = () => {
  const [date, setDate] = useState(new Date())






  return (
    <main className='calendar'>
      <h1 className='text-center'>React Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </main>
  )
}

export default CalendarPage