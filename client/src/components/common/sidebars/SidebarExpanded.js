import { isUserAuth } from '../../../helpers/Auth'
import SidebarExpandedAuth from './SidebarExpandedAuth'
import SidebarExpandedUnauth from './SidebarExpandedUnauth'

const SidebarExpanded = ({ isNavHover, setIsNavHover }) => {
  return (
    <>
      {isUserAuth() ? 
        <SidebarExpandedAuth isNavHover={isNavHover} setIsNavHover={setIsNavHover} />
        :
        <SidebarExpandedUnauth />
      }
    </>
  )
}

export default SidebarExpanded