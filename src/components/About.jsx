import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const interests = [
  {
    icon: '⬡',
    title: 'High-Intensity Training',
    desc: 'Running a strict periodized hypertrophy program. The same discipline that drives progressive overload in the gym drives iteration in the lab.',
    accent: '#00d4ff',
  },
  {
    icon: '⚔',
    title: 'Tactical RPGs',
    desc: "Cleared the Tree Sentinel first encounter in Elden Ring. The mental model for reading attack patterns maps directly to debugging non-obvious ML pipeline failures.",
    accent: '#8b5cf6',
  },
  {
    icon: '◈',
    title: 'Editorial Photography',
    desc: 'Deeply invested in high-fashion photography aesthetics — composing AI-generated editorial shoots that sit at the intersection of algorithmic control and artistic vision.',
    accent: '#c4a882',
  },
  {
    icon: '∿',
    title: 'Biomedical Research',
    desc: 'Passionate about applying computational methods to clinical problems — from ECG signal analysis to forensic osteology data pipelines.',
    accent: '#0ea5e9',
  },
]

function InterestCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-5 glass rounded-xl group hover:bg-white/5 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <span
          className="text-xl font-mono flex-shrink-0 mt-0.5"
          style={{ color: item.accent }}
        >
          {item.icon}
        </span>
        <div>
          <h4 className="font-serif text-base font-semibold text-text-primary mb-1">{item.title}</h4>
          <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 bg-onyx relative overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 bg-dot opacity-30 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-violet-DEFAULT/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-px bg-clay-DEFAULT" />
              <span className="section-label" style={{ color: '#c4a882' }}>The Human Element</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-heading text-5xl md:text-6xl mb-8"
            >
              About Me
            </motion.h2>

            {/* Avatar placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-surface-3 border border-white/5"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(139,92,246,0.08))' }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-DEFAULT/40 to-violet-DEFAULT/40 flex items-center justify-center">
                  <span className="font-serif text-3xl text-text-primary font-bold">You</span>
                </div>
                <p className="font-mono text-xs text-text-muted">[ Replace with your photo ]</p>
              </div>
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyan-DEFAULT/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-violet-DEFAULT/40" />
            </motion.div>

            {/* Bio paragraphs */}
            {[
              "I'm Davis Asish — a junior AI/ML engineer operating across the full stack: from GPU-accelerated data pipelines and multimodal deep learning architectures to TypeScript front-ends and Claude-powered AI integrations. I build things that actually ship.",
              "My flagship project, MMA-Net, is a hybrid CNN-Transformer that fuses ECG and PCG cardiac signals via a Gated Multimodal Unit for five-class arrhythmia classification — achieving F1-Macro 0.855 and AUC-ROC 0.889. Beyond biomedical AI, I've shipped a local Stable Diffusion app, a Claude-powered e-commerce platform with a live AI chatbot, a cryptographic password security tool, and an unbeatable Minimax game AI.",
              "My approach to engineering is shaped by everything I do outside of code. The same relentless focus that drives my hypertrophy training, the pattern-reading that gets me through Elden Ring's hardest encounters, and the compositional eye I've developed through editorial photography — all of it feeds back into how I build, debug, and design AI systems.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="text-text-secondary text-sm leading-relaxed mb-4"
              >
                {para}
              </motion.p>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 tracking-wide">
                Open to full-time and internship roles
              </span>
            </motion.div>
          </div>

          {/* Right: Interests */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-2xl font-bold text-text-primary mb-8"
            >
              What Shapes My Engineering
            </motion.h3>

            <div className="space-y-3 mb-12">
              {interests.map((item, i) => (
                <InterestCard key={item.title} item={item} index={i} />
              ))}
            </div>

            {/* Philosophy quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative pl-5 border-l-2 border-clay-DEFAULT/50"
            >
              <p className="font-serif text-lg italic text-text-secondary leading-relaxed">
                "Great AI engineering requires both rigorous technical depth{' '}
                <span className="text-clay-DEFAULT">and</span> strong aesthetic intuition. The two aren't in conflict — they compound."
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
