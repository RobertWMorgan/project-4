import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getUserToken, getUserName } from '../helpers/Auth'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'


const CalendarPage = () => {
  const navigate = useNavigate()

  const [date, setDate] = useState(new Date())
  const [userInfo, setUserInfo] = useState('')
  const { username } = useParams()
  const [selectedGrouping, setSelectedGrouping] = useState('')
  const [noteToEdit, setNoteToEdit] = useState('')

  const handleGroupingChange = (e) => {
    setSelectedGrouping(e.target.value)
    console.log(e.target.value, 'grouping')
  }

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${username}`)
        setUserInfo(data)
        console.log(data)

        if ( username !== getUserName() ){
          navigate('/')
        }
        
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


  const [showEditForm, setShowEditForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleShowEdit = () => {
    setShowEditForm(true)
  }

  const handleDefaultValue = async (id) => {
    try {
      const { data } = await axios.get(`/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      setFormEditData({
        weight: data.weight,
        distance: data.distance,
        reps: data.reps,
        description: data.description,
        exercise: data.exercise,
      })
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
    
  }

    
  const handleShowAdd = () => setShowAddForm(true)
  const handleClose = () => {
    setShowEditForm(false)
    setShowAddForm(false)
  }

  const [formEditData, setFormEditData] = useState({
    weight: '',
    distance: '',
    reps: '',
    description: '',
    exercise: '',
  })

  const [formAddData, setFormAddData] = useState({
    weight: '',
    distance: '',
    reps: '',
    description: '',
    exercise: '',
  })

  const [errors, setErrors] = useState({
    weight: '',
    distance: '',
    reps: '',
    description: '',
    exercise: '',
  })

  const handleAddChange = (e) => {
    setFormAddData({ ...formAddData, [e.target.name]: e.target.value })
  }

  const handleEditChange = (e) => {
    setFormEditData({ ...formEditData, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/notes/${noteToEdit}/`, formEditData, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      console.log('posted')
      window.location.reload()
    } catch (error) {
      setErrors(error.response.data.detail)
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/notes/', formAddData, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      console.log('posted')
      window.location.reload()
    } catch (error) {
      setErrors(error.response.data.detail)
    }
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
          <span>
            {/* Add Modal */}
            <button className="modal-launch exercise-add-note" onClick={() => {
              handleShowAdd()
            }}>
              <span className='add-exercise-note-button'>+ Add New Note</span>
            </button>
            <Modal show={showAddForm} onHide={handleClose}>
              <Modal.Header className="auth-modal-header" closeButton>
                <Modal.Title className="auth-modal-title" >Add Workout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <p className='denied-text'>* Required</p>
                    <label className="mr-sm-2 form-label" htmlFor="inlineFormCustomSelect">Category<p className='denied-text'>*</p></label>
                    <select onChange={handleGroupingChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option disabled selected>Choose...</option>
                      <option value='Abs'>Abs</option>
                      <option value='Back'>Back</option>
                      <option value='Biceps'>Biceps</option>
                      <option value='Cardio'>Cardio</option>
                      <option value='Chest'>Chest</option>
                      <option value='Legs'>Legs</option>
                      <option value='Shoulders'>Shoulders</option>
                      <option value='Triceps'>Triceps</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label className="mr-sm-2 form-label" htmlFor="inlineFormCustomSelect">Exercise<p className='denied-text'>*</p></label>
                    <select onChange={handleAddChange} name='exercise' className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option disabled selected>Chose...</option>
                      {!userInfo.exercises ?
                        <p>None</p>
                        :
                        userInfo.exercises.map((exercise) => {
                          if (exercise.grouping === selectedGrouping) {
                            return (
                              <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                            )
                          }
                        })}
                    </select>
                    {errors.exercise && <p className='denied-text'>{errors.exercise}</p>}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type='text' placeholder='' autoFocus onChange={handleAddChange} name='weight' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Distance</Form.Label>
                    <Form.Control type='text' placeholder='' autoFocus onChange={handleAddChange} name='distance' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Reps<p className='denied-text'>*</p></Form.Label>
                    <Form.Control type='number' placeholder='' autoFocus onChange={handleAddChange} name='reps' />
                    {errors.reps && <p className='denied-text'>{errors.reps}</p>}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type='text' placeholder='' autoFocus onChange={handleAddChange} name='description' />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="auth-footer">
                <button className='auth-modal-submit' onClick={handleAddSubmit}>
                  Submit
                </button>
                <button className='auth-modal-close' onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>


          </span>
          <div><h3>Selected Date: {date.toDateString()}</h3></div>
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

                              {/* Edit Modal */}
                              <button value={note.id} className="modal-launch" onClick={() => {
                                setNoteToEdit(note.id)
                                handleShowEdit()
                                handleDefaultValue(note.id)
                              }}>
                                <span>✏️</span>
                              </button>
                              <Modal show={showEditForm} onHide={handleClose}>
                                <Modal.Header className="auth-modal-header" closeButton>
                                  <Modal.Title className="auth-modal-title" >Edit Workout</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                      <p className='denied-text'>* Required</p>
                                      <label className="mr-sm-2 form-label" htmlFor="inlineFormCustomSelect">Category<p className='denied-text'>*</p></label>
                                      <select onChange={handleGroupingChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <option disabled selected>Choose...</option>
                                        <option value='Abs'>Abs</option>
                                        <option value='Back'>Back</option>
                                        <option value='Biceps'>Biceps</option>
                                        <option value='Cardio'>Cardio</option>
                                        <option value='Chest'>Chest</option>
                                        <option value='Legs'>Legs</option>
                                        <option value='Shoulders'>Shoulders</option>
                                        <option value='Triceps'>Triceps</option>
                                      </select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                      <label className="mr-sm-2 form-label" htmlFor="inlineFormCustomSelect">Exercise<p className='denied-text'>*</p></label>
                                      <select onChange={handleEditChange} name='exercise' className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                        <option disabled selected>Choose...</option>
                                        {!userInfo.exercises ?
                                          <p>None</p>
                                          :
                                          userInfo.exercises.map((exercise) => {
                                            if (exercise.grouping === selectedGrouping) {
                                              return (
                                                <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                              )
                                            }
                                          })}
                                      </select>
                                      {errors.exercise && <p className='denied-text'>{errors.exercise}</p>}
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlTextarea1">
                                      <Form.Label>Weight</Form.Label>
                                      <Form.Control value={formEditData.weight} type='text' placeholder='' autoFocus onChange={handleEditChange} name='weight' />
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlTextarea1">
                                      <Form.Label>Distance</Form.Label>
                                      <Form.Control type='text' value={formEditData.distance} placeholder='' autoFocus onChange={handleEditChange} name='distance' />
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlTextarea1">
                                      <Form.Label>Reps<p className='denied-text'>*</p></Form.Label>
                                      <Form.Control type='number' value={formEditData.reps} placeholder='' autoFocus onChange={handleEditChange} name='reps' />
                                      {errors.reps && <p className='denied-text'>{errors.reps}</p>}
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="exampleForm.ControlTextarea1">
                                      <Form.Label>Comment</Form.Label>
                                      <Form.Control type='text' value={formEditData.description} placeholder='' autoFocus onChange={handleEditChange} name='description' />
                                    </Form.Group>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer className="auth-footer">
                                  <button className='auth-modal-submit' onClick={handleEditSubmit}>
                                    Submit
                                  </button>
                                  <button className='auth-modal-close' onClick={handleClose}>
                                    Close
                                  </button>
                                </Modal.Footer>
                              </Modal>


                              <button value={note.id} onClick={handleDelete} className='exercise-note-delete'>🗑</button>
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