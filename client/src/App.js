import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Sidebar from './components/common/sidebars/Sidebar'
import Calendar from './components/Calendar'
import ExerciseOverview from './components/ExerciseOverview'

const App = () => {

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/exercises' element={<ExerciseOverview />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
