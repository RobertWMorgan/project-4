import { useNavigate, useLocation } from 'react-router-dom'
import react, { useState, useEffect } from 'react'
import { getUserName } from '../../../helpers/Auth'
import { isUserAuth } from '../../../helpers/Auth'
import axios from 'axios'

const SidebarExpandedAuth = () => {
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
  })

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }


  return (
    <div className='sidebar-expanded'>
      <div className='profile'>
        <img className='profile-icon' src='/images/face.PNG' alt='my face' />
        <h2>{profileInfo.username}</h2>
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