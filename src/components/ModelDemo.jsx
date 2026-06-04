import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const TABS = ['Sentiment Analysis', 'Image Generation']

const MOCK_SENTIMENTS = {
  positive: { label: 'Positive', score: 0.94, emoji: '◎', color: '#22c55e', bar: 'bg-emerald-500' },
  negative: { label: 'Negative', score: 0.87, emoji: '◉', color: '#ef4444', bar: 'bg-red-500' },
  neutral: { label: 'Neutral', score: 0.61, emoji: '○', color: '#8b5cf6', bar: 'bg-violet-DEFAULT' },
}

const EXAMPLE_PROMPTS = [
  'This model achieves outstanding results on the benchmark dataset.',
  'I am deeply frustrated with this broken API.',
  'The weather today is neither good nor bad.',
]

const IMAGE_STYLES = [
  { id: 'editorial', label: 'Editorial Fashion', desc: 'Vogue-style high-contrast photography' },
  { id: 'medical', label: 'Medical Render', desc: 'Clinical equipment visualization' },
  { id: 'portrait', label: 'Portrait Study', desc: 'Dramatic lighting, editorial tone' },
]

function SentimentTab() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const lower = text.toLowerCase()
      let sentiment
      if (lower.match(/great|outstanding|excel|love|amazing|perfect|good|best|win/i)) {
        sentiment = MOCK_SENTIMENTS.positive
      } else if (lower.match(/bad|terrible|frustrat|broken|fail|hate|awful|worst|error/i)) {
        sentiment = MOCK_SENTIMENTS.negative
      } else {
        sentiment = MOCK_SENTIMENTS.neutral
      }
      setResult(sentiment)
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
          Input Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter any text to analyze sentiment..."
          className="w-full bg-surface-3 border border-white/8 rounded-lg p-4 text-text-primary text-sm font-mono resize-none h-28 focus:outline-none focus:border-cyan-DEFAULT/50 transition-colors placeholder:text-text-muted"
        />
        {/* Example prompts */}
        <div className="flex flex-wrap gap-2 mt-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setText(p)}
              className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/5 text-text-muted hover:text-text-secondary hover:border-white/10 rounded transition-all truncate max-w-xs"
            >
              {p.slice(0, 40)}…
            </button>
          ))}
        </div>
      </div>

      <motion.button
        onClick={analyze}
        disabled={!text.trim() || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3 bg-cyan-DEFAULT text-onyx font-mono text-sm font-semibold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        {loading ? 'Analyzing...' : 'Run Analysis'}
      </motion.button>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 bg-surface-3 rounded-lg border border-white/5"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-text-secondary">Processing through sentiment model...</span>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-5 bg-surface-3 rounded-xl border border-white/8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl" style={{ color: result.color }}>{result.emoji}</span>
                <div>
                  <p className="font-mono text-xs text-text-muted tracking-widest uppercase">Result</p>
                  <p className="font-serif text-xl font-bold" style={{ color: result.color }}>
                    {result.label}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-text-muted">Confidence</p>
                <p className="font-mono text-xl font-bold" style={{ color: result.color }}>
                  {(result.score * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            {/* Confidence bar */}
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${result.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${result.score * 100}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="font-mono text-xs text-text-muted mt-3">
              ⚡ This is a demo placeholder — connect your sentiment API endpoint to enable real inference.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ImageGenTab() {
  const [style, setStyle] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)

  const generate = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setGenerated(false)
    setTimeout(() => {
      setLoading(false)
      setGenerated(true)
    }, 2000)
  }

  return (
    <div className="space-y-5">
      {/* Style selector */}
      <div>
        <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
          Style Preset
        </label>
        <div className="grid grid-cols-3 gap-2">
          {IMAGE_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                style === s.id
                  ? 'border-violet-DEFAULT bg-violet-DEFAULT/10 text-text-primary'
                  : 'border-white/5 bg-surface-3 text-text-secondary hover:border-white/10'
              }`}
            >
              <p className="font-mono text-xs font-semibold">{s.label}</p>
              <p className="font-mono text-xs text-text-muted mt-0.5 hidden sm:block">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt */}
      <div>
        <label className="block font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
          Prompt
        </label>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Editorial portrait, dramatic rim lighting, stark shadows..."
          className="w-full bg-surface-3 border border-white/8 rounded-lg p-4 text-text-primary text-sm font-mono focus:outline-none focus:border-violet-DEFAULT/50 transition-colors placeholder:text-text-muted"
        />
      </div>

      <motion.button
        onClick={generate}
        disabled={!prompt.trim() || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3 bg-violet-DEFAULT text-white font-mono text-sm font-semibold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </motion.button>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-48 bg-surface-3 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-DEFAULT/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="relative flex flex-col items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-8 bg-violet-DEFAULT/60 rounded-full"
                    animate={{ scaleY: [1, 2, 1] }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-text-muted">Diffusion in progress...</span>
            </div>
          </motion.div>
        )}

        {generated && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-48 bg-surface-3 rounded-xl border border-violet-DEFAULT/30 overflow-hidden flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(0,212,255,0.05))' }}
          >
            <div className="text-center">
              <p className="font-serif text-2xl text-text-primary mb-1">[ Image Placeholder ]</p>
              <p className="font-mono text-xs text-text-muted">Plug in your Stable Diffusion / DALL·E API key to enable generation</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ModelDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="demo" className="py-24 bg-surface-DEFAULT" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-violet-DEFAULT" />
            <span className="section-label" style={{ color: '#8b5cf6' }}>Live Demo</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-5xl md:text-6xl"
          >
            Model Playground
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary mt-4 max-w-xl"
          >
            Interactive demo UI — connect your API endpoints to enable live inference.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          {/* API status badge */}
          <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs text-amber-400">Demo Mode — API not connected</span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/8 mb-6">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 font-mono text-sm transition-all duration-200 relative ${
                  activeTab === i ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
                {activeTab === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-cyan-DEFAULT"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 0 ? <SentimentTab /> : <ImageGenTab />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
