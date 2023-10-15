import React, { useState, useRef } from 'react';
import './App.css';
import avatarNoBackground from './public/avatar no background.png';
import project1 from './public/Screenshot 2023-10-12 180200.png';
import project2 from './public/Screenshot 2023-10-12 181918.png';
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { GiSkills } from 'react-icons/gi';
import { FaProjectDiagram } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projectInfo = [
    {
      title: 'Click Recorder',
      description: 'Censored name of the program due to buyer privacy. \
      this program records the clicks of the user in the "recorder" tab of the DirectX menu.\
      from these clicks, a "click profile" is created to replicate these clicks humanly.\
      this denies the ability for a serverside anticheat to tell the user is\
      using an autoclicker. creating an unfair advantage',
      image: project1,
      languages: ['JavaScript', 'HTML', 'CSS'],
      link: '#',
    },
    {
      title: 'Software Loader',
      description: 'The main issue with selling software is cracking and pirating said software \
      this software loader is a solution to this problem. by checking username, hardware components like \
      cpu serial number, disk serial number, and mac address you can check if the user is \
      the user paying for the software. even if the user gets passed these checks, the software is \
      still loaded by streaming bytes and manual mapping the exe or file. this way the user would \
      have to manually dump the software, fix imports, and much more things to run it.',
      image: project2,
      languages: ['HTML', 'CSS'],
      link: '##',
    },
  ];

  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  const handleScrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const nextProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projectInfo.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + projectInfo.length) % projectInfo.length);
      setIsAnimating(false);
    }, 300);
  };

  const totalProjects = projectInfo.length;

  const gradientClass = darkMode ? 'bg-gradient-to-l from-gray-900 to-gray-800 bg-right' : 'bg-white';

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div ref={aboutRef} id="about" className={gradientClass}>
        <div className="border-b-2 navbar z-10 fixed top-0 left-0 w-full p-4 text-gray-900 bg-white flex justify-around dark:bg-gray-800 dark:border-gray-600 dark:text-white">
          <p onClick={() => handleScrollToSection(aboutRef)} className="nav-link cursor-pointer font-Roboto">
            About
          </p>
          <p onClick={() => handleScrollToSection(skillsRef)} className="nav-link cursor-pointer font-Roboto">
            Skills
          </p>
          <p onClick={() => handleScrollToSection(projectsRef)} className="nav-link cursor-pointer font-Roboto">
            Projects
          </p>
          <p className="nav-link cursor-pointer font-Roboto">Writeups</p>
        </div>

        <main className="px-4 pt-16">
          <Reveal>
            <section className="flex items-center justify-center">
              <div className="py-10 flex items-center">
                <div className="dark:bg-slate-600 bg-gray-800 rounded-full w-36 h-36 drop-shadow-2xl">
                  <Reveal unique="true">
                    <img src={avatarNoBackground} className="rounded-full w-full h-full" alt="Avatar" />
                  </Reveal>
                </div>
                <div className="pl-6">
                  <div className="flex flex-col">
                    <h1 className="text-3xl dark:text-white font-Raleway font-bold">Hi, I'm Aiden.</h1>
                    <h2 className="pt-1 font-Roboto text-lg dark:text-gray-300">Software Developer</h2>
                  </div>
                  <div className="flex items-center">
                    <a href="#">
                      <AiFillGithub className="text-3xl dark:fill-white" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
          <Reveal>
            <div ref={skillsRef} id="skills" className="px-12 shadow-lg py-20 pt-6 rounded-lg dark:shadow-slate-950">
              <div className="flex items-center">
                <AiOutlineUnorderedList className="text-3xl mr-2 dark:text-white" />
                <h1 className="text-3xl dark:text-white font-Raleway font-bold">About Me</h1>
              </div>
              <h2 className="pt-1 font-Roboto text-base dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="px-12 shadow-lg py-20 rounded-lg dark:shadow-slate-950">
              <div className="flex items-center">
                <GiSkills className="text-3xl mr-2 dark:text-white" />
                <h1 className="text-3xl dark:text-white font-Raleway font-bold">Skills</h1>
              </div>
              <div className="grid grid-cols-2 gap-1 my-4">
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• JavaScript</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Python</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Java</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• HTML/CSS</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• C#</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Ruby</p>
                </div>
              </div>
              <h2 className="font-Roboto text-base dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div
              ref={projectsRef}
              id="projects"
              className={`px-12 shadow-lg py-10 pb-5 rounded-lg ${darkMode ? 'dark:shadow-slate-950' : 'shadow-gray-300'}`}
            >
              <div className="flex flex-col mt-4 relative">
                {/* Project title */}
                <div className={`flex items-center ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`}>
                  <FaProjectDiagram className={`text-3xl mr-2 ${darkMode ? 'dark:text-white' : 'text-gray-800'}`} />
                  <h1 className={`text-3xl underline decoration-2 underline-offset-4 hover:text-gray-700 dark:hover:text-gray-200 ${darkMode ? 'dark:text-white' : 'text-black'} font-Raleway font-bold mb-2`}>
                    <a href={projectInfo[currentIndex].link} target="_blank" rel="noopener noreferrer">
                      {projectInfo[currentIndex].title}
                    </a>
                  </h1>
                </div>

                {/* Project description */}
                <h2 className={`text-base font-Roboto ${darkMode ? 'dark:text-gray-300' : 'text-gray-700'} overflow-hidden line-clamp-3 ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`}>
                  {projectInfo[currentIndex].description}
                </h2>

                {/* Image */}
                <div className={`relative mt-4 rounded-lg drop-shadow-xl ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`} style={{ height: '200px' }}>
                  <img
                    src={projectInfo[currentIndex].image}
                    alt={projectInfo[currentIndex].title}
                    className="w-full h-full object-cover rounded-lg blur-sm"
                  />

                  {/* Arrows */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
                    <div className="cursor-pointer" onClick={() => prevProject()}>
                      <AiOutlineArrowLeft className={`text-3xl text-white`} />
                    </div>
                    <div className="cursor-pointer" onClick={() => nextProject()}>
                      <AiOutlineArrowRight className={`text-3xl text-white`} />
                    </div>
                  </div>
                </div>


                {/* Languages */}
                <div className={`flex my-4 ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`}>
                  {projectInfo[currentIndex].languages.map((language, index) => (
                    <p
                      key={index}
                      className={`text-sm font-Raleway font-bold ${darkMode ? 'dark:text-gray-100' : 'text-gray-900'} rounded-full border ${darkMode ? 'border-gray-700' : 'border-gray-800'} p-2 mr-2`}
                    >
                      {language}
                    </p>
                  ))}
                </div>

                <div className={`text-center dark:text-gray-600 text-gray-400 ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`}>
                  {currentIndex + 1}/{totalProjects}
                </div>
              </div>
            </div>
          </Reveal>
          <div className="py-5 rounded-lg"></div>
        </main>
      </div>
    </div>
  );
}

export default App;
