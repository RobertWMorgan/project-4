import { useNavigate, useLocation } from 'react-router-dom'
import react, { useState, useEffect } from 'react'
import { getUserName } from '../../../helpers/Auth'
import { isUserAuth } from '../../../helpers/Auth'
import SidebarExpandedAuth from './SidebarExpandedAuth'
import SidebarExpandedUnauth from './SidebarExpandedUnauth'

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
    window.location.reload()
  }
  return (
    <>
      {isUserAuth() ? 
        <SidebarExpandedAuth />
        :
        <SidebarExpandedUnauth />
      }
    </>
  )
}

export default SidebarExpanded