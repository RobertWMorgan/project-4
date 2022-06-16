import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Sidebar from './components/common/sidebars/Sidebar'
import CalendarPage from './components/Calendar'
import ExerciseOverview from './components/ExerciseOverview'
import NotFound from './components/common/NotFound'

const App = () => {

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/calendar/:username' element={<CalendarPage />} />
          <Route path='/exercises' element={<ExerciseOverview />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
