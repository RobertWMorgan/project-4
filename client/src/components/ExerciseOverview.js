import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserName } from '../helpers/Auth'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { getUserToken } from '../helpers/Auth'

const ExerciseOverview = () => {
  const [userInfo, setUserInfo] = useState('')
  const [filterGroup, setFilterGroup] = useState('')

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${getUserName()}`)
        setUserInfo(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUserInfo()
  }, [])

  const groupArray = ['Abs', 'Back', 'Biceps', 'Cardio', 'Chest', 'Legs', 'Shoulders', 'Triceps']

  const handleClick = (e) => {
    setFilterGroup(e.target.value)
    console.log(e.target.value)
  }

  const handleFilter = () => {
    return userInfo.exercises.filter(exercise => {
      return exercise.grouping.includes(filterGroup)
    })
  }

  const imageDisplay = () => {
    if (filterGroup === 'Abs') {
      return <img src='/images/abs.png' alt='abs diagram' />
    } else if (filterGroup === 'Back') {
      return <img src='/images/back.png' alt='back diagram' />
    } else if (filterGroup === 'Biceps') {
      return <img src='/images/biceps.png' alt='biceps diagram' />
    } else if (filterGroup === 'Cardio') {
      return <img src='/images/cardio.png' alt='cardio diagram' />
    } else if (filterGroup === 'Chest') {
      return <img src='/images/chest.png' alt='chest diagram' />
    } else if (filterGroup === 'Legs') {
      return <img src='/images/legs.png' alt='legs diagram' />
    } else if (filterGroup === 'Shoulders') {
      return <img src='/images/shoulders.png' alt='shoulders diagram' />
    } else if (filterGroup === 'Triceps') {
      return <img src='/images/triceps.png' alt='triceps diagram' />
    }
  }


  const [showEditForm, setShowEditForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleShowEdit = () => setShowEditForm(true)
  const handleShowAdd = () => setShowAddForm(true)
  const handleClose = () => {
    setShowEditForm(false)
    setShowAddForm(false)
  }

  const [formAddData, setFormAddData] = useState({
    name: '',
    grouping: '',
    description: '',
    video_url: '',
  })

  const handleAddChange = (e) => {
    setFormAddData({ ...formAddData, [e.target.name]: e.target.value })
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/exercises/', formAddData, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const [exerciseToEdit, SetExerciseToEdit] = useState('')

  const [formEditData, setFormEditData] = useState({
    name: '',
    grouping: '',
    description: '',
    video_url: '',
  })

  const handleEditChange = (e) => {
    setFormEditData({ ...formEditData, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/exercises/${exerciseToEdit}/`, formEditData, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      console.log('posted')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  
  const handleDelete = async (e) => {
    try {
      await axios.delete(`/api/exercises/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="exercises">
      <h1>My Exercises</h1>
      <ul>
        {filterGroup === '' ?
          <button value={''} className='selected-group grouping-filter'>All</button>
          :
          <button value={''} className='grouping-filter' onClick={handleClick}>All</button>
        }
        {groupArray.map((group, index) => {
          return (
            filterGroup === group
              ?
              <button value={group} key={index} className='selected-group grouping-filter'>{group}</button>
              :
              <button value={group} key={index} className='grouping-filter' onClick={handleClick}>{group}</button>
          )
        })}
      </ul>
      <div className='exercise-container'>
        <div className='exercise-list-view'>
          {/* Add Modal */}
          <button className="modal-launch add-new-exercise-button" onClick={() => {
            handleShowAdd()
          }}>
            <span className='add-exercise-note-button'>+ Add Exercise</span>
          </button>
          <Modal show={showAddForm} onHide={handleClose}>
            <Modal.Header className="auth-modal-header" closeButton>
              <Modal.Title className="auth-modal-title" >Add Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Muscle Group</label>
                  <select onChange={handleAddChange} name='grouping' className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Exercise Name</Form.Label>
                  <Form.Control type='text' placeholder='' autoFocus onChange={handleAddChange} name='name' />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type='text' placeholder='' autoFocus onChange={handleAddChange} name='description' />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Video tutorial</Form.Label>
                  <Form.Control type='text' placeholder='' autoFocus onChange={handleAddChange} name='video_url' />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="auth-footer">
              <button className='auth-modal-submit' onClick={handleAddSubmit}>
                Add
              </button>
              <button className='auth-modal-close' onClick={handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
          {!userInfo ?
            <p>Loading...</p>
            :
            <>
              {
                handleFilter().length === 0 ?
                  <p>No exercises found, please add some</p>
                  :
                  <>
                    {handleFilter().map((exercise) => {
                      return (
                        <div key={exercise.id} className='exercise-card'>
                          <h3>{exercise.name}</h3>
                          {/* Edit Modal */}
                          <button className="modal-launch edit-exercise-button" onClick={() => {
                            handleShowEdit()
                            SetExerciseToEdit(exercise.id)
                          }}>
                            <span className='add-exercise-note-button-text'>✏️</span>
                          </button>
                          <Modal show={showEditForm} onHide={handleClose}>
                            <Modal.Header className="auth-modal-header" closeButton>
                              <Modal.Title className="auth-modal-title" >Edit Exercise</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                  <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Muscle Group</label>
                                  <select onChange={handleEditChange} name='grouping' className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1">
                                  <Form.Label>Exercise Name</Form.Label>
                                  <Form.Control type='text' placeholder='' autoFocus onChange={handleEditChange} name='name' />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control type='text' placeholder='' autoFocus onChange={handleEditChange} name='description' />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1">
                                  <Form.Label>Video tutorial</Form.Label>
                                  <Form.Control type='text' placeholder='' autoFocus onChange={handleEditChange} name='video_url' />
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
                          <button value={exercise.id} onClick={handleDelete} className='exercise-delete-button'>🗑</button>
                          <p>{exercise.description}</p>
                          <a target='_blank' rel='noreferrer' href='exercise.video_url'>Video Guide</a>
                        </div>
                      )
                    })}
                  </>
              }
            </>
          }
        </div>

        <div className='image-container'>
          {imageDisplay()}

        </div>
      </div>

    </main>
  )
}

export default ExerciseOverview