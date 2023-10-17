import React from 'react';
import '../App.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ markdown, darkMode }) => {
  return (
    <div className={`prose prose-lg`}>
      <ReactMarkdown
        className={(darkMode ? "text-gray-200" : "") + (darkMode ? " react-markdown" : "")}
        children={markdown}
        id="reactMarkDown"
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
                className="custom-scrollbar-style"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={'${className}'} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
