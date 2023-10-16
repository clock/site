import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import Loader from '../public/markdown/Loader.md';
import MarkdownLoader from '../components/MarkdownLoader';

export default function Writeups() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    // Fetch the Markdown content from the file
    fetch(Loader)
      .then((response) => response.text())
      .then((data) => setMarkdownContent(data));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerClasses = `min-h-screen transition-all duration-500 ${
    darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
  }`;

  useEffect(() => {
    // Add an event listener to track window size changes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={containerClasses}>
      {isMobile ? (
        <div className="p-4">
          <div className="prose lg:prose-xl">
            <MarkdownLoader filePath={Loader} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4 flex items-center justify-center h-full">
          <div className="prose lg:prose-xl">
            <MarkdownLoader filePath={Loader} />
          </div>
        </div>
      )}
    </div>
  );
}
