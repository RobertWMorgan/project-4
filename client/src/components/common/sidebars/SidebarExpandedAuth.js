import { useNavigate, useLocation } from 'react-router-dom'
import react, { useState, useEffect } from 'react'
import { getUserName, isUserAuth, getUserToken } from '../../../helpers/Auth'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const SidebarExpandedAuth = ({ isNavHover, setIsNavHover }) => {
  // Navigation
  const navigate = useNavigate()
  const location = useLocation()

  const [currentLocation, setCurrentLocation] = useState('/')

  // Finding the active page
  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location])

  const handleLogout = () => {
    window.localStorage.removeItem('brogress-username')
    window.localStorage.removeItem('brogress-token')
    navigate('/')
    window.location.reload()
  }

  // Profile info
  const [profileInfo, setProfileInfo] = useState('')

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${getUserName()}`)
        console.log(data)
        setProfileInfo(data)
      } catch (error) {
        console.log(error)
      }
    }

    getProfileData()
  }, [])

  // Edit Form
  const [showForm, setShowForm] = useState(false)
  const handleShowEdit = () => setShowForm(true)
  const handleClose = () => setShowForm(false)

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    goal_weight: '',
    profile_image: '',
  })

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      await axios.put(`/api/auth/${getUserName()}/`, formData, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      })
      window.location.reload()
    } catch (error) {
      console.log(error.response)
    }
  }

  // Auto populate form
  const handleDefaultValue = () => {
    console.log(formData, profileInfo.weight)
    setFormData({
      weight: profileInfo.weight,
      height: profileInfo.height,
      goal_weight: profileInfo.goal_weight,
    })
  }

  const handleImageSubmit = (e) => {
    e.preventDefault()

    const uploadImage = async () => {
      const uploadURL = process.env.REACT_APP_CLOUDINARY_URL
      const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

      const data = new FormData()
      data.append('file', e.target.files[0])
      data.append('upload_preset', preset)

      try {
        const res = await axios.post(uploadURL, data)
        setFormData({ ...formData, profile_image: res.data.url })
        console.log('data', res.data)
        changeProfile(res.data.url)
      } catch (error) {
        console.log(error.response)
      }
    } 
    
    const changeProfile = async (imageUrl) => {
      try {
        await axios.put(`/api/auth/${getUserName()}/`, { profile_image: imageUrl }, {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        })
        window.location.reload()
      } catch (error) {
        console.log(error.response)
      }
    }


    uploadImage()
    console.log(e.target.files[0])
  }

  return (
    <div className='sidebar-expanded'>
      <div className='profile'>
        <div className='image-container'>
          <p>Click to change image</p>
          <label htmlFor='fileUpload'>
            <img className='profile-icon' src={profileInfo.profile_image} alt='my face' />
          </label>
          <input hidden id='fileUpload' type='file' onClick={setIsNavHover(true)} onChange={handleImageSubmit} />
        </div>

        <h2>{profileInfo.username}
          <span>
            <button className="modal-launch" onClick={() => {
              handleShowEdit()
              handleDefaultValue()
            }}>
              <span>✏️</span>
            </button>
            <Modal show={showForm} onHide={handleClose}>
              <Modal.Header className="auth-modal-header" closeButton>
                <Modal.Title className="auth-modal-title" >Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control value={formData.weight} type='text' placeholder='' autoFocus onChange={handleFormChange} name='weight' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Goal Weight</Form.Label>
                    <Form.Control value={formData.goal_weight} type='text' placeholder='' autoFocus onChange={handleFormChange} name='goal_weight' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Height</Form.Label>
                    <Form.Control value={formData.height} type='text' placeholder='' autoFocus onChange={handleFormChange} name='height' />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="auth-footer">
                <button className='auth-modal-submit' onClick={handleFormSubmit}>
                  Submit
                </button>
                <button className='auth-modal-close' onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>


          </span>
        </h2>
        <h5>Height:</h5>
        {
          !profileInfo.height ?
            <p>No Height Set</p>
            :
            <p>{profileInfo.height}</p>
        }
        <h5>Weight:</h5>
        {
          !profileInfo.weight ?
            <p>No Weight Set</p>
            :
            <p>{profileInfo.weight}</p>
        }
        <h5>Goal Weight:</h5>
        {
          !profileInfo.goal_weight ?
            <p>No Goal Set</p>
            :
            <p>{profileInfo.goal_weight}</p>
        }
      </div>
      <ul className='nav_icons'>
        <span onClick={() => navigate('/')}>
          {
            (currentLocation === '/') ?
              <>
                <p className='sidebar-white'>Home</p>
                <img className='nav_icon' src='/images/home-white.png' alt='home' />
              </>
              :
              <>
                <p>Home</p>
                <img className='nav_icon' src='/images/home-grey.png' alt='home' />
              </>
          }
        </span>
        <span onClick={() => navigate('/exercises')}>
          {
            (currentLocation === '/exercises') ?
              <>
                <p className='sidebar-white'>My Exercises</p>
                <img className='nav_icon' src='/images/dumbell-white.png' alt='dumbell' />
              </>
              :
              <>
                <p>My Exercises</p>
                <img className='nav_icon' src='/images/dumbell-grey.png' alt='dumbell' />
              </>
          }


        </span>
        <span onClick={() => navigate(`/calendar/${getUserName()}`)}>
          {
            (currentLocation === `/calendar/${getUserName()}`) ?
              <>
                <p className='sidebar-white'>Exercise Tracker</p>
                <img className='nav_icon' src='/images/calendar-white.png' alt='calendar' />
              </>
              :
              <>
                <p>Exercise Tracker</p>
                <img className='nav_icon' src='/images/calendar-grey.png' alt='calendar' />
              </>
          }

        </span>
        {isUserAuth() &&
          <span onClick={handleLogout}>
            <p>Sign Out</p>
            <img className='nav_icon' src='/images/power-grey.png' alt='power-button' />
          </span>
        }

      </ul>
    </div>
  )
}

export default SidebarExpandedAuth