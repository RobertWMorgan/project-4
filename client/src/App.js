import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Sidebar from './components/common/Sidebar'


import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />



        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
