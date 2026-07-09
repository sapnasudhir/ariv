import { MotionConfig } from 'motion/react'
import Header from './components/Header'
import Hero from './components/Hero'
import VideoGallery from './components/VideoGallery'
import AboutMe from './components/AboutMe'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <Hero />
      <VideoGallery />
      <AboutMe />
      <Footer />
    </MotionConfig>
  )
}

export default App
