import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getUserToken } from '../helpers/Auth'

const CalendarPage = () => {
  const [date, setDate] = useState(new Date())
  const [userInfo, setUserInfo] = useState('')
  const { username } = useParams()



  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${username}`)
        setUserInfo(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUserInfo()
  }, [])


  const getNote = () => {
    return userInfo.notes.filter(note => {

      const noteDate = new Date(note.date)
      const noteString = noteDate.toString()
      const dateString = date.toString()

      const noteFormatted = noteString.substr(0, 15)
      const dateFormatted = dateString.substr(0, 15)

      if (noteFormatted === dateFormatted) {
        return note
      }
    })
  }

  const handleDelete = async (e) => {
    try {
      await axios.delete(`/api/notes/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    
    console.log(e.target.value)
  }


  return (
    <main className='calendar'>
      <h1 className='text-center'>Exercise Tracker</h1>
      <div className='calendar-page-content'>
        <div className='calendar-container'>
          <Calendar onChange={setDate} value={date} />
        </div>
        <section className='calendar-right'>
          <h2>Exercise Notes </h2>
          <div>Selected Date: {date.toDateString()}</div>
          <div className='notes-aside'> 
            {!userInfo ?
              <p>Loading...</p>
              :
              <>
                {(getNote().length === 0) ?
                  <p>No Notes Added</p>
                  :
                  <>
                    {getNote().map((note) => {
                      return (
                        <div className='exercise-notes' key={note.id}>
                          <div className='exercise-note-header'>
                            <h4>{note.exercise.name} - {note.exercise.grouping}</h4>
                            <div>
                              <button value={note.id} className='exercise-note-edit'>Edit</button>
                              <button value={note.id} onClick={handleDelete} className='exercise-note-delete'>Delete</button>
                            </div>
                          </div>
                          <div className='exercise-notes-details'>
                            {!note.weight ?
                              <p><span className='notes-title'>Distance:</span> {note.distance}</p>
                              :
                              <p><span className='notes-title'>Weight:</span> {note.weight}</p>
                            }
                            <p><span className='notes-title'>Reps:</span> {note.reps}</p>
                          </div>
                          <span className='notes-title'>Comment:</span>
                          <p>{note.description}</p>
                          <hr />
                        </div>
                      )
                    })
                    }
                  </>
                }

              </>
            }
          </div>
        </section>
      </div>

    </main>
  )
}

export default CalendarPage