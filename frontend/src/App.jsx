import React from 'react'
import {Route,Routes } from "react-router"
import Homepage from '../pages/Homepage'
import CreatePage from '../pages/CreatePage'
import NotedetailPage from '../pages/NotedetailPage'
import toast from 'react-hot-toast'
const App = () => {
  return (
    <div data-theme="forest">
      
      <Routes className="text-amber-200">
        <Route path="/" element={<Homepage/>}/>
        <Route path="/notetaking"  element={<CreatePage/>}/>
        <Route path="/update/:id"  element={<NotedetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App
