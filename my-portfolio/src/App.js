import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Writeups from './pages/Writeups';
import Error from './pages/Error'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writeups" element={<Writeups />} />
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  )
}
