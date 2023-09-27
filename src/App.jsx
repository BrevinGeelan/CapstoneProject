import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import AllProducts from './components/AllProducts'
import Navbar from './components/NavBar'
import Modal from 'react-modal'
import Mens from './components/MensCat'
import Womens from './components/WomensCat'
import Electronics from './components/ElecCat'
import Jewels from './components/Jewelry'
import Register from './components/Registration'
import Login from './components/Login'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

function App() {


  return (
    
      <div>
       <Navbar />
       <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/MensCat" element={<Mens />} />
        <Route path="/WomensCat" element={<Womens />} />
        <Route path="/ElecCat" element={<Electronics />} />
        <Route path="/Jewelry" element={<Jewels />} />
        <Route path="/Registration" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
       </Routes>
      </div>
      
  )
}

export default App
