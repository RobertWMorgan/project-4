import { useNavigate } from 'react-router-dom'


const SidebarExpanded = () => {
  const navigate = useNavigate()

  return (
    <div className = 'sidebar-expanded'>
      <p>Login to view profile</p>
      <ul className='nav_icons'>
        <span onClick={() => navigate('/')}>
          <p>Home</p>
          <img className='nav_icon' src='images/home-grey.png' alt='home'/>
        </span>
        <span onClick={() => navigate('/exercises')}>
          <p>My Exercises</p>
          <img className='nav_icon' src='images/dumbell-grey.png' alt='dumbell'/>
        </span>
        <span onClick={() => navigate('/calendar')}>
          <p>Exercise Tracker</p>
          <img className='nav_icon' src='images/calendar-grey.png' alt='calendar'/>
        </span>
        <span>
          <p>Sign Out</p>
          <img className='nav_icon' src='images/power-grey.png' alt='power-button'/>
        </span>
      </ul>
    </div>
  )
}

export default SidebarExpanded