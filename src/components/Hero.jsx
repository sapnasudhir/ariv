import { motion } from 'motion/react'
import { FaChevronDown } from 'react-icons/fa'
import heroImage from '../assets/about/ariv-yule-log.jpg'

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Welcome to My Kitchen Kingdom</h1>
        <p>
          I'm Ariv. Every recipe is a new world I get to build with my own two
          hands — come see what I'm cooking up.
        </p>
      </div>
      <motion.a
        href="#videos"
        className="hero-scroll-cue"
        aria-label="Scroll to videos"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <FaChevronDown />
      </motion.a>
    </section>
  )
}

export default Hero
