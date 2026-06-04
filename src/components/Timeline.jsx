import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timelineItems } from '../data/timeline'

const typeIcons = {
  role: '◉',
  achievement: '★',
  project: '⬡',
  education: '◎',
}

const typeLabels = {
  role: 'Role',
  achievement: 'Achievement',
  project: 'Project',
  education: 'Education',
}

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} justify-start pl-10 md:pl-0 md:pr-0 mb-8`}
    >
      {/* Center dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-5 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.07 + 0.2 }}
          className="w-4 h-4 rounded-full border-2 border-surface-DEFAULT flex items-center justify-center"
          style={{ background: item.accent }}
        />
      </div>

      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-2 md:left-1/2 md:-translate-x-[0.5px] top-8 w-px h-full bg-white/8" />
      )}

      {/* Card */}
      <div className={`w-full md:w-5/12 ${isLeft ? '' : ''}`}>
        <motion.div
          whileHover={{ y: -2 }}
          className="glass rounded-xl p-5 hover:bg-white/5 transition-all duration-300 group"
          style={{ '--accent': item.accent }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm" style={{ color: item.accent }}>
                {typeIcons[item.type]}
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-sm border"
                style={{ color: item.accent, borderColor: `${item.accent}30`, background: `${item.accent}10` }}
              >
                {typeLabels[item.type]}
              </span>
            </div>
            <span className="font-mono text-xs text-text-muted">{item.period}</span>
          </div>

          <h3 className="font-serif text-base font-bold text-text-primary mb-1 group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="font-mono text-xs text-text-muted mb-2">{item.subtitle}</p>
          <p className="text-text-secondary text-xs leading-relaxed mb-3">{item.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-1.5 py-0.5 bg-white/5 border border-white/5 text-text-muted rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="timeline" className="py-24 bg-surface-DEFAULT relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-clay-DEFAULT" />
            <span className="section-label" style={{ color: '#c4a882' }}>Journey</span>
            <span className="w-8 h-px bg-clay-DEFAULT" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-5xl md:text-6xl"
          >
            Timeline & Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary mt-4 max-w-lg mx-auto"
          >
            A structured record of research milestones, project completions, and technical progression.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line (desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

          {timelineItems.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              isLast={i === timelineItems.length - 1}
            />
          ))}
        </div>

        {/* Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-3 px-8 py-4 border border-white/10 text-text-primary hover:border-clay-DEFAULT/50 hover:bg-clay-DEFAULT/5 transition-all duration-300 rounded-sm"
          >
            <span className="font-mono text-sm tracking-widest uppercase">Download Full Resume</span>
            <motion.span
              className="text-clay-DEFAULT"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
