import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import Loader from '../public/markdown/Loader.md';
import MarkdownLoader from '../components/MarkdownLoader';
import Reveal from '../components/Reveal';

export default function Writeups() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [markdownTarget, setMarkdownTarget] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  let mkFile = "";

  let lookupMap = new Map();

  lookupMap = {
    'Loader' : Loader,  
  }

  useEffect(() => {
    // Fetch the Markdown content from the file
    let buffer = (window.location.href).split("#");
    let text = buffer[buffer.length - 1];
    console.log(text);

    setMarkdownTarget(lookupMap[text]);

    if (markdownTarget == undefined || markdownTarget == null)
      return;

    fetch(markdownTarget)
      .then((response) => response.text())
      .then((data) => setMarkdownContent(data));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerClasses = `min-h-screen transition-all duration-500 ${
    darkMode
      ? 'bg-[#1d1f21] text-white'
      : 'bg-gray-100 text-gray-900'
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
      <Reveal>
      {isMobile ? (
        <div className="p-4">
          <div className={'prose lg:prose-xl'}>
            <MarkdownLoader filePath={markdownTarget} darkMode={darkMode}/>
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-4xl p-4 flex items-center justify-center h-full">
          <div className={'prose lg:prose-xl p-4'}>
            <MarkdownLoader filePath={markdownTarget} darkMode={darkMode} />
          </div>
        </div>
      )}
      </Reveal>
    </div>
  );
}
