import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups } from '../data/skills'

const sizeClasses = {
  large: 'md:col-span-2 md:row-span-2',
  medium: 'md:col-span-1 md:row-span-2',
  wide: 'md:col-span-3 md:row-span-1',
  small: 'md:col-span-1 md:row-span-1',
}

function SkillTile({ group, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`${sizeClasses[group.size]} relative overflow-hidden rounded-lg glass group cursor-default transition-shadow duration-300`}
      style={{ '--accent': group.accent }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${group.accent}18, transparent 60%)` }}
      />

      {/* Accent border on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${group.accent}, transparent)` }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-2xl font-mono leading-none"
            style={{ color: group.accent }}
          >
            {group.icon}
          </span>
          <span
            className="font-mono text-xs tracking-widest uppercase px-2 py-0.5 rounded-sm border"
            style={{ color: group.accent, borderColor: `${group.accent}40`, background: `${group.accent}10` }}
          >
            {group.id.replace('-', ' ')}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-text-primary mb-2 group-hover:text-white transition-colors">
          {group.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-xs leading-relaxed mb-4 flex-1">
          {group.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-mono px-2 py-0.5 rounded-sm bg-white/5 text-text-secondary border border-white/5 hover:border-white/10 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 bg-onyx">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-cyan-DEFAULT" />
            <span className="section-label">Technical Arsenal</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-5xl md:text-6xl"
          >
            What I Build With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary mt-4 max-w-xl"
          >
            From low-level systems to production ML pipelines — a multidisciplinary stack built through intentional, deep practice.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[180px] gap-3">
          {skillGroups.map((group, i) => (
            <SkillTile key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
