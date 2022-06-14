import { isUserAuth } from '../../../helpers/Auth'
import SidebarExpandedAuth from './SidebarExpandedAuth'
import SidebarExpandedUnauth from './SidebarExpandedUnauth'

const SidebarExpanded = () => {
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