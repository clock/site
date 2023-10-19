import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import Loader from '../public/markdown/Loader.md';
import MarkdownLoader from '../components/MarkdownLoader';
import { MdDarkMode } from 'react-icons/md';
import Reveal from '../components/Reveal';

export default function Writeups() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [markdownTarget, setMarkdownTarget] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });
  const [writeupList, setWriteupList] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const location = useLocation();

  let lookupMap = {
    'loader': Loader,
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const text = location.hash.slice(1).toLowerCase();

    if (text && lookupMap[text]) {
      setMarkdownTarget(lookupMap[text]);
      setWriteupList(false);

      fetch(markdownTarget)
        .then((response) => response.text())
        .then((data) => {
          setMarkdownContent(data);
          setIsLoading(false); // Mark loading as complete
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
          window.location.hash = 'Writeups';
          setIsLoading(false); // Mark loading as complete in case of error
        });
    } else {
      setWriteupList(true);
      setMarkdownTarget(null);
      setIsLoading(false); // Mark loading as complete
    }
  }, [location, markdownTarget]);

  const handleBackClick = () => {
    if (writeupList) {
      // Navigate to /home if writeupList is true
      window.location.href = '/home';
    } else {
      // Navigate to /#Writeups if writeupList is false
      window.location.hash = 'Writeups';
    }
  };

  const containerClasses = `min-h-screen transition-all duration-500 ${darkMode
    ? 'bg-[#1d1f21] text-white'
    : 'bg-gray-100 text-gray-900'
  }`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Map the keys outside of the return statement
  const linkElements = Object.keys(lookupMap).map((key) => (
    <div key={key}>
      <a className={darkMode ? "text-gray-100 hover:text-gray-200" : "hover:text-gray-700"} href={`#writeups#${key}`}>{`# ${key.charAt(0).toUpperCase() + key.slice(1)}`}</a>
    </div>
  ));

  return (
    <div className={containerClasses}>
      <Reveal>
        {isLoading ? ( // Display loading indicator while content is loading
          <div>Loading...</div>
        ) : writeupList ? (
          <div className="flex items-center px-[18%] pt-10 h-full">
            <div className={'prose lg:prose-xl p-4'}>
              <div className='flex gap-x-1'>
                <button className={darkMode ? "text-gray-100 hover:text-gray-200 hover" : "hover:text-gray-700"} onClick={handleBackClick}>Back</button>
              </div>
              {linkElements}
            </div>
          </div>
        ) : (
          isMobile ? (
            <div className="p-4">
              <div className={'prose lg:prose-xl'}>
                <button className={darkMode ? "text-gray-100 hover:text-gray-200 hover" : "hover:text-gray-700"} onClick={handleBackClick}>Back</button>
                <MarkdownLoader filePath={markdownTarget} darkMode={darkMode} />
              </div>
            </div>
          ) : (
            <div className="container mx-auto max-w-4xl p-4 flex items-center justify-center h-full">
              <div className={'prose lg:prose-xl p-4'}>
                <button className={darkMode ? "text-gray-100 hover:text-gray-200 hover" : "hover:text-gray-700"} onClick={handleBackClick}>Back</button>
                <MarkdownLoader filePath={markdownTarget} darkMode={darkMode} />
              </div>
            </div>
          )
        )}
      </Reveal>
    </div>
  );
}
