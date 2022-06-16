
const SidebarExpandedUnauth = () => {

  return (
    <div className='sidebar-expanded'>
      <p className='temp'></p>
      <ul className='nav_icons'>
        <span>
          <p className='sidebar-white'>Home</p>
          <img className='nav_icon' src='/images/home-white.png' alt='home' />
        </span>
        <span >
          <p>My Exercises</p>
          <img className='nav_icon' src='/images/dumbell-grey.png' alt='dumbell' />

        </span>
        <span>
          <p>Exercise Tracker</p>
          <img className='nav_icon' src='/images/calendar-grey.png' alt='calendar' />
        </span>
      </ul>
    </div>
  )
}

export default SidebarExpandedUnauth