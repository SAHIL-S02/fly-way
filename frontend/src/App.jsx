import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Others from './components/Others'
import Footer from './components/Footer'
import Ticket from './components/Ticket'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<><Home/><Others/></>}/>
        <Route path='/ticket' element={<Ticket/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
