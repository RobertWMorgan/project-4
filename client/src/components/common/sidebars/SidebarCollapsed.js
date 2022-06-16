import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUserName } from '../../../helpers/Auth'
import { isUserAuth } from '../../../helpers/Auth'

const SidebarCollapsed = () => {
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState('/')

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location])

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location])
  return (
    <div className='sidebar-collapsed'>
      <p className='temp'>.</p>
      <ul className='nav_icons'>
        {
          (currentLocation === '/') ?
            <>
              <img className='nav_icon' src='/images/home-white.png' alt='home' />
            </>
            :
            <>
              <img className='nav_icon' src='/images/home-grey.png' alt='home' />
            </>
        }
        {
          (currentLocation === '/exercises') ?
            <>
              <img className='nav_icon' src='/images/dumbell-white.png' alt='dumbell' />
            </>
            :
            <>
              <img className='nav_icon' src='/images/dumbell-grey.png' alt='dumbell' />
            </>
        }
        {
          (currentLocation === `/calendar/${getUserName()}`) ?
            <>
              <img className='nav_icon' src='/images/calendar-white.png' alt='calendar' />
            </>
            :
            <>
              <img className='nav_icon' src='/images/calendar-grey.png' alt='calendar' />
            </>
        }
        {isUserAuth() &&
        <img className='nav_icon' src='/images/power-grey.png' alt='power-button' />
        }
      </ul>
    </div>
  )
}

export default SidebarCollapsed