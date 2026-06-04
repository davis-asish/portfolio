import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../data/projects'

const badgeStyles = {
  cyan: 'text-cyan-DEFAULT border-cyan-DEFAULT/40 bg-cyan-DEFAULT/10',
  violet: 'text-violet-DEFAULT border-violet-DEFAULT/40 bg-violet-DEFAULT/10',
  clay: 'text-clay-DEFAULT border-clay-DEFAULT/40 bg-clay-DEFAULT/10',
}

const statusStyles = {
  green: 'bg-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/20 text-amber-400',
  blue: 'bg-blue-500/20 text-blue-400',
}

/* ── GitHub icon SVG ─────────────────────────────────────── */
function GitHubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

/* ── Metric pill ─────────────────────────────────────────── */
function MetricPill({ label, value }) {
  return (
    <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg border border-white/5">
      <span className="font-mono text-lg font-bold text-cyan-DEFAULT">{value}</span>
      <span className="font-mono text-xs text-text-muted mt-0.5">{label}</span>
    </div>
  )
}

/* ── Individual project card ─────────────────────────────── */
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isLarge = project.size === 'large'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-xl glass group ${isLarge ? 'md:col-span-2' : ''}`}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}80, transparent)` }}
      />

      {/* Hover bg glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${project.accentColor}08, transparent 60%)` }}
      />

      <div className="relative z-10 p-6 md:p-8">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between gap-4 mb-5">
          {/* Left: icon + badges */}
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-2xl font-mono font-bold leading-none w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5"
              style={{ color: project.accentColor }}
            >
              {project.icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${badgeStyles[project.badgeColor]}`}>
                  {project.badge}
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${statusStyles[project.statusColor]}`}>
                  {project.status}
                </span>
              </div>
              <span className="font-mono text-xs text-text-muted mt-1 block">{project.year}</span>
            </div>
          </div>

          {/* Right: GitHub link + expand toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.93 }}
                title="View on GitHub"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              >
                <GitHubIcon size={15} />
              </motion.a>
            )}
            <motion.button
              onClick={() => setExpanded((v) => !v)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              title={expanded ? 'Collapse' : 'Show highlights'}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:border-white/30 hover:text-text-primary transition-all"
            >
              <motion.span
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg leading-none"
              >
                +
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* ── Title + subtitle ── */}
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-primary mb-1 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4">{project.subtitle}</p>

        {/* ── Description ── */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* ── Tech stack ── */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 bg-white/5 border border-white/5 text-text-secondary rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── Metrics grid ── */}
        {Object.keys(project.metrics).length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-5">
            {Object.entries(project.metrics).map(([k, v]) => (
              <MetricPill key={k} label={k.toUpperCase()} value={v} />
            ))}
          </div>
        )}

        {/* ── Always-visible GitHub CTA ── */}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-secondary transition-colors mb-1 group/gh"
          >
            <GitHubIcon size={12} />
            <span className="group-hover/gh:underline underline-offset-2">
              github.com/davis-asish/{project.githubUrl.split('/').pop()}
            </span>
            <span className="opacity-0 group-hover/gh:opacity-100 transition-opacity">↗</span>
          </motion.a>
        )}

        {/* ── Expandable highlights ── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t pt-5 mt-4" style={{ borderColor: `${project.accentColor}25` }}>
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-3"
                  style={{ color: project.accentColor }}
                >
                  Key Highlights
                </p>
                <ul className="space-y-2 mb-5">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span style={{ color: project.accentColor }} className="mt-1 text-xs flex-shrink-0">▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div className="flex items-center gap-3" style={{ borderTop: `1px solid ${project.accentColor}20`, paddingTop: '1rem' }}>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wide border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/25 hover:bg-white/5 rounded-sm transition-all"
                    >
                      <GitHubIcon size={13} />
                      View on GitHub
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${project.accentColor}40` }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wide text-onyx font-semibold rounded-sm transition-all"
                      style={{ backgroundColor: project.accentColor }}
                    >
                      <span>↗</span> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────────── */
export default function Projects() {
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 bg-surface-DEFAULT">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-violet-DEFAULT" />
            <span className="section-label" style={{ color: '#8b5cf6' }}>Selected Work</span>
          </motion.div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="section-heading text-5xl md:text-6xl"
              >
                Projects & Research
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-text-secondary mt-4 max-w-xl"
              >
                From publication-ready biomedical AI to creative generative work — each project reflects an obsession with getting it right.
              </motion.p>
            </div>

            {/* GitHub profile CTA */}
            <motion.a
              href="https://github.com/davis-asish"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-5 py-2.5 border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/25 hover:bg-white/5 rounded-sm font-mono text-xs tracking-wide transition-all duration-200 self-end mb-1"
            >
              <GitHubIcon size={14} />
              github.com/davis-asish
              <span className="text-text-muted">↗</span>
            </motion.a>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
