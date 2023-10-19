import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import Loader from '../public/markdown/Loader.md';
import Unknown from '../public/markdown/Unknown.md';
import MarkdownLoader from '../components/MarkdownLoader';
import Reveal from '../components/Reveal';

export default function Writeups() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [markdownTarget, setMarkdownTarget] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [writeupList, setWriteupList] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const location = useLocation();

  let lookupMap = {
    'Loader': Loader,
    'Default': Unknown,
  };

  useEffect(() => {
    console.log(location.hash);

    const text = location.hash.slice(1); // Get the value after the '#' in the URL
    if (location.hash.slice(1) == '' || location.hash.slice(1) == undefined) {
      setWriteupList(true);
    }
    else {

      // Use 'Default' if not found in the lookupMap
      setMarkdownTarget(lookupMap[text] || lookupMap['Default']);

      if (markdownTarget) {
        fetch(markdownTarget)
          .then((response) => response.text())
          .then((data) => setMarkdownContent(data))
          .catch((error) => {
            console.error("Error fetching content:", error);
            // Handle the error, e.g., show a message to the user
          });
      }
    }
  }, [location, markdownTarget]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const containerClasses = `min-h-screen transition-all duration-500 ${darkMode
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
        {markdownContent ? ( // Render only if markdownContent is available
          isMobile ? (
            <div className="p-4">
              <div className={'prose lg:prose-xl'}>
                <MarkdownLoader filePath={markdownTarget} darkMode={darkMode} />
              </div>
            </div>
          ) : (
            <div className="container mx-auto max-w-4xl p-4 flex items-center justify-center h-full">
              <div className={'prose lg:prose-xl p-4'}>
                <MarkdownLoader filePath={markdownTarget} darkMode={darkMode} />
              </div>
            </div>
          )
        ) : (
          <div>Loading... or handle error here</div>
        )}
      </Reveal>
    </div>
  );
}
