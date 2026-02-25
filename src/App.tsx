import { useEffect } from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Navigation from './components/Navigation'
import InteractiveCursor from './components/InteractiveCursor'

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-dark">
      <InteractiveCursor />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
