import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const WORDS_LINE1 = ['Engineering', 'Intelligence.']
const WORDS_LINE2 = ['Designing', 'Reality.']

function AnimatedWord({ word, delay }) {
  return (
    <span className="inline-block overflow-hidden leading-none">
      <motion.span
        className="inline-block"
        initial={{ y: '105%', rotate: 3 }}
        animate={{ y: '0%', rotate: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}&nbsp;
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-onyx noise-overlay"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-DEFAULT/5 blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-DEFAULT/5 blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Floating geometric accents */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-16 w-16 h-16 border border-cyan-DEFAULT/20 rounded-sm opacity-40 hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 left-24 w-10 h-10 border border-violet-DEFAULT/20 rounded-full opacity-30 hidden lg:block"
      />
      <motion.div
        className="absolute top-1/2 right-8 h-40 w-px bg-gradient-to-b from-transparent via-cyan-DEFAULT/30 to-transparent hidden xl:block"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-cyan-DEFAULT" />
          <span className="section-label">AI/ML Engineer · Class of 2025</span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
          <div className="text-text-primary">
            {WORDS_LINE1.map((w, i) => (
              <AnimatedWord key={w} word={w} delay={0.3 + i * 0.12} />
            ))}
          </div>
          <div className="text-gradient-cyan italic">
            {WORDS_LINE2.map((w, i) => (
              <AnimatedWord key={w} word={w} delay={0.55 + i * 0.12} />
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-text-secondary text-base md:text-lg leading-relaxed mb-12 font-light"
        >
          Junior AI/ML Engineer specializing in{' '}
          <span className="text-text-primary">multimodal models</span>,{' '}
          <span className="text-text-primary">robust system architectures</span>, and{' '}
          <span className="text-text-primary">ethical AI development</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4"
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-cyan-DEFAULT text-onyx font-mono text-sm font-semibold tracking-widest uppercase transition-all duration-200"
          >
            Explore My Work
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 border border-white/20 text-text-primary font-mono text-sm tracking-widest uppercase hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-text-muted to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 writing-vertical hidden xl:flex items-center gap-2"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-text-muted">
          Open to Opportunities
        </span>
        <span className="w-8 h-px bg-text-muted inline-block" />
      </motion.div>
    </section>
  )
}
