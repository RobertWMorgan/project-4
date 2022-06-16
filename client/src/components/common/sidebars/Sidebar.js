import React, { useState } from 'react'
import SidebarExpanded from './SidebarExpanded'
import SidebarCollapsed from './SidebarCollapsed'

const Sidebar = () => {

  const [ isNavHover, setIsNavHover ] = useState(false)
  return (
    <div className={isNavHover ? 'sidebar-open' : 'sidebar-closed'}
      onMouseEnter={() => setIsNavHover(true)}
      onMouseLeave={() => setIsNavHover(false)}
    >
      {isNavHover ? 
        <SidebarExpanded isNavHover={isNavHover} setIsNavHover={setIsNavHover} /> 
        :
        <SidebarCollapsed />}
    </div>
  )
}


export default Sidebar