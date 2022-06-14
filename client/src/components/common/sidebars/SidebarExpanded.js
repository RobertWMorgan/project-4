import { useNavigate, useLocation } from 'react-router-dom'
import react, { useState, useEffect } from 'react'
import { getUserName } from '../../../helpers/Auth'

const SidebarExpanded = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [currentLocation, setCurrentLocation] = useState('/')

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location])

  const handleLogout = () => {
    window.localStorage.removeItem('brogress-username')
    window.localStorage.removeItem('brogress-token')
    navigate('/')
  }
  return (
    <div className='sidebar-expanded'>
      <p>Please Login</p>
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
        <span onClick={handleLogout}>
          <p>Sign Out</p>
          <img className='nav_icon' src='/images/power-grey.png' alt='power-button' />
        </span>
      </ul>
    </div>
  )
}

export default SidebarExpanded