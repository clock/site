import React, { useState, useRef } from 'react';
import '../App.css';

export default function Error() {
  const [darkMode, setDarkMode] = useState(true);

  const gradientClass = darkMode ? 'bg-gradient-to-l from-gray-900 to-gray-800 bg-right' : 'bg-white';

  return (
    <div className={darkMode ? 'dark' : ''}>
        <h1>error 404</h1>
    </div>
  );
}
