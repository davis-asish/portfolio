import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 0.855, suffix: ' F1', label: 'MMA-Net F1-Macro', sublabel: 'MIT-BIH + CinC 2016 · 5-fold CV', accent: '#00d4ff' },
  { value: 0.889, suffix: ' AUC', label: 'AUC-ROC', sublabel: 'MMA-Net · macro average', accent: '#8b5cf6' },
  { value: 0.791, suffix: ' κ', label: "Cohen's Kappa", sublabel: 'Corrected for class imbalance', accent: '#c4a882' },
  { value: 5, suffix: '', label: 'Projects Shipped', sublabel: 'Research to production', accent: '#0ea5e9' },
]

function Counter({ value, suffix, accent, isVisible }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const duration = 1600
    const start = performance.now()
    const raf = requestAnimationFrame(function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      setDisplay(ease * value)
      if (progress < 1) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [isVisible, value])

  const formatted = value % 1 !== 0
    ? display.toFixed(1)
    : Math.round(display).toLocaleString()

  return (
    <span className="font-serif font-bold" style={{ color: accent }}>
      {formatted}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 border-y border-white/5 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-surface-2 p-8 lg:p-10 relative group hover:bg-surface-3 transition-colors duration-300"
            >
              {/* Hover accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: stat.accent }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="text-4xl lg:text-5xl xl:text-6xl mb-3 leading-none">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  accent={stat.accent}
                  isVisible={isInView}
                />
              </div>
              <p className="text-text-primary font-medium text-sm mb-1">{stat.label}</p>
              <p className="font-mono text-text-muted text-xs tracking-wide">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
