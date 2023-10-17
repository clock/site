import React, { useEffect, useState } from 'react';
import '../App.css';
import MarkdownRenderer from './MarkdownRenderer';

const MarkdownLoader = ({ filePath, darkMode} ) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => setMarkdown(data))
      .catch((error) => console.error('Error loading Markdown:', error));
  }, [filePath]);

  return <MarkdownRenderer markdown={markdown} darkMode={darkMode} />;
};

export default MarkdownLoader;
