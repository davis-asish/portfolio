import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Terminal from './components/Terminal'
import ModelDemo from './components/ModelDemo'
import About from './components/About'
import Timeline from './components/Timeline'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-onyx text-text-primary">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Skills />
        <Terminal />
        <ModelDemo />
        <About />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}
