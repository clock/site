import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import avatarNoBackground from '../public/avatar no background.png';
import project1 from '../public/Screenshot 2023-10-12 180200.png';
import project2 from '../public/Screenshot 2023-10-12 181918.png';
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { GiSkills } from 'react-icons/gi';
import { FaProjectDiagram } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdDarkMode } from 'react-icons/md';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projectInfo = [
    {
      title: 'Software Loader',
      description: 'Software loader excluding access from non-paying users or users without an account. Disallow the ability to crack / pirate software. This is a full stack application with an API, Nextjs React admin panel using Tailwind CSS, SQL database with locking, and finally, a C++ client is all used.',
      image: project2,
      languages: ['C++', 'Node.js', 'SQL', 'React', 'Tailwind'],
      link: '../#writeups#loader',
    },
  ];

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>

      <div ref={aboutRef} id="about" className={gradientClass + " md:flex md:items-center md:justify-center md:flex-col"}>
        <div className="lg:px-[18%] border-b-2 navbar z-10 fixed top-0 left-0 w-full p-4 text-gray-900 bg-white flex justify-around dark:bg-gray-800 dark:border-gray-600 dark:text-white">
          <p onClick={() => handleScrollToSection(aboutRef)} className="nav-link cursor-pointer font-Roboto hover:text-gray-600 dark:hover:text-gray-300">
            About
          </p>
          <p onClick={() => handleScrollToSection(skillsRef)} className="nav-link cursor-pointer font-Roboto hover:text-gray-600 dark:hover:text-gray-300">
            Skills
          </p>
          <p onClick={() => handleScrollToSection(projectsRef)} className="nav-link cursor-pointer font-Roboto hover:text-gray-600 dark:hover:text-gray-300">
            Projects
          </p>
          <a href="./#Writeups" className="nav-link cursor-pointer font-Roboto hover:text-gray-700 dark:hover:text-gray-300">Writeups</a>
        </div>

        <main className="px-4 pt-16 md:w-[75%] lg:w-[60%] md:flex md:items-center md:justify-center md:flex-col">
          <Reveal>
            <section className="lg:flex lg:items-center lg:justify-center">
              <div className="py-10 flex items-center">
                <div className="dark:bg-slate-600 bg-gray-800 rounded-full w-36 h-36 drop-shadow-2xl">
                  <Reveal unique="true">
                    <img src={avatarNoBackground} className="rounded-full w-full h-full" alt="Avatar" />
                  </Reveal>
                </div>
                <div className="pl-6">
                  <div className="flex flex-col">
                    <h1 className="lg:text-4xl md:text-3xl text-3xl dark:text-white font-Raleway font-bold">Hi, I'm Aiden.</h1>
                    <h2 className="pt-1 font-Roboto text-lg lg:text-xl dark:text-gray-300">Software Developer</h2>
                  </div>
                  <div className="flex items-center">
                  <MdDarkMode className="text-3xl dark:fill-white cursor-pointer dark:hover:fill-gray-200 hover:text-gray-700" onClick={toggleDarkMode} />
                    <a href='https://github.com/clock' target="_blank">
                      <AiFillGithub className="text-3xl dark:fill-white hover:text-gray-700 dark:hover:fill-gray-200" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
          <Reveal>
            <div ref={skillsRef} id="skills" className="px-12 shadow-lg py-20 pt-6 lg:py-10 md:py-12 rounded-lg dark:shadow-slate-950">
              <div className="flex items-center lg:text-center">
                <AiOutlineUnorderedList className="text-3xl mr-2 dark:text-white" />
                <h1 className="text-3xl dark:text-white font-Raleway font-bold lg:text-center">About Me</h1>
              </div>
              <h2 className="pt-1 font-Roboto text-base dark:text-gray-300 leading-relaxed lg:text-lg md:leading-7 lg:leading-loose">
                From an early age, I felt an undeniable pull toward programming. The thrill of crafting software and the intrigue of exploring the inner workings of technology captivated me. As I delved deeper into computer science, I honed my focus on software security and exploitation. My journey began with techniques to manipulate virtual memory in games, enabling me to create cheats, while also creating efficiency-enhancing scripts for daily tasks. The power to automate once time-consuming chores felt like a superpower I wanted to share with everyone.
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
                  <p className="text-base font-Raleway font-bold dark:text-white">• C++</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Node.js</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Javascript</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• React</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Python</p>
                </div>
                <div className="">
                  <p className="text-base font-Raleway font-bold dark:text-white">• Lua</p>
                </div>
              </div>
              <h2 className="font-Roboto text-base dark:text-gray-300 leading-relaxed lg:text-lg md:leading-7 lg:leading-loose">
                I possess a diverse skill set in programming languages and technologies, including proficiency in C++, Node.js, JavaScript, React, Python, and Lua. These skills enable me to tackle a wide range of software development and scripting tasks, from low-level system programming to web development and automation.
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
                  <h1 className={`text-3xl underline decoration-2 underline-offset-4 hover:text-gray-700 dark:hover:text-gray-300 ${darkMode ? 'dark:text-white' : 'text-black'} font-Raleway font-bold mb-2`}>
                    <a href={projectInfo[currentIndex].link} rel="noopener noreferrer">
                      {projectInfo[currentIndex].title}
                    </a>
                  </h1>
                </div>

                {/* Project description */}
                <h2 className={`lg:text-lg md:leading-7 lg:leading-loose leading-relaxed text-base font-Roboto ${darkMode ? 'dark:text-gray-300' : 'text-gray-700'} overflow-hidden line-clamp-3 ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`}>
                  {projectInfo[currentIndex].description}
                </h2>

                {/* Image */}
                <div className={`relative mt-4 rounded-lg drop-shadow-xl ${isAnimating ? 'fade-out' : 'fade-in'} fade-animation`} style={{ height: '400px' }}>
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
