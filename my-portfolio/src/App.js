import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}
