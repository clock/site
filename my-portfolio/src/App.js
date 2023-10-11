import './App.css';
import { useState } from 'react';
import avatar from "./public/avatar.png";
import avatarNoBackground from "./public/avatar no background.png";
import { AiFillGithub } from 'react-icons/ai';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ""}>
      <div className="flex justify-center">
        <div className="container mx-auto grid grid-cols-4 gap-4 text-center px-4 pt-4">
          <p className="text-sm font-Raleway font-bold">About Me</p>
          <p className="text-sm font-Raleway font-bold">Projects</p>
          <p className="text-sm font-Raleway font-bold">Projects</p>
          <p className="text-sm font-Raleway font-bold">Projects</p>
        </div>
      </div>

      <main className="px-4 pt-4 dark:bg-gray-900">
        <section className="flex items-center justify-center">
          <div className='py-10 px-12 flex items-center'>
            <div className='dark:bg-gray-300 bg-gray-800 rounded-full w-36 h-36'>
              <img src={avatarNoBackground} className='rounded-full w-full h-full' alt='Avatar' />
            </div>
            <div className='pl-6'>
              <div className="flex flex-col">
                <h1 className='text-3xl dark:text-white font-Raleway font-bold'>Hi, I'm Aiden.</h1>
                <h2 className='pt-1 font-Roboto text-lg dark:text-gray-300'>
                  Software Developer
                </h2>
              </div>
              <div className="flex items-center">
                <a href='#'><AiFillGithub className='text-3xl dark:fill-white'></AiFillGithub></a>
              </div>
            </div>
          </div>
        </section>
        <div className='px-12 shadow-lg py-20 pt-4 rounded-lg'>
          <h1 className='text-3xl dark:text-white font-Raleway font-bold text-center'>About Me</h1>
          <h2 className='pt-1 font-Roboto text-base dark:text-gray-300 text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </h2>
        </div>
        <div className='px-12 shadow-lg py-20 my-20 rounded-lg'>
          <h1 className='text-3xl dark:text-white font-Raleway font-bold text-center'>About Me</h1>
          <h2 className='pt-1 font-Roboto text-base dark:text-gray-300 text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </h2>
        </div>
      </main>
    </div>

  );
}

export default App;
