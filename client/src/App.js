import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'


import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />



        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
