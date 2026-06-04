import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const PROMPT = 'visitor@portfolio:~$'

const HELP_TEXT = `
Available commands:
  whoami          — Identity & role
  bio             — Full bio
  skills          — Technical skill set
  projects        — Project list
  contact         — Contact information
  cat contact.txt — Same as contact
  run bio         — Same as bio
  execute skills.py — Same as skills
  ls              — List directory
  clear           — Clear terminal
  help            — Show this menu
`.trim()

const LS_OUTPUT = `
drwxr-xr-x  projects/
drwxr-xr-x  research/
-rw-r--r--  resume.pdf
-rw-r--r--  contact.txt
-rw-r--r--  bio.md
-rwxr-xr-x  skills.py
`.trim()

const RESPONSES = {
  help: () => HELP_TEXT,
  whoami: () =>
    `Name   : Davis Asish\nRole   : Junior AI/ML Engineer · CSE (Minor in AI/ML)\nFocus  : Multimodal deep learning, biomedical AI, full-stack AI applications\nStatus : Open to opportunities`,
  bio: () =>
    `I'm Davis Asish — a multidisciplinary AI/ML engineer at the intersection of\ndeep learning, biomedical signal processing, and full-stack AI development.\n\nFlagship work: MMA-Net — a hybrid CNN-Transformer that fuses ECG + PCG signals\nvia a Gated Multimodal Unit for 5-class AAMI arrhythmia classification.\nResults: F1-Macro 0.855 ± 0.010 · AUC-ROC 0.889 ± 0.012 · κ=0.791.\n\nOther projects: NeuralStyleTransferApp (local Stable Diffusion Turbo + Docker),\nUppucheppa (Next.js 14 + Claude AI e-commerce), TicTacToe AI (Minimax + PyGame).\n\nWhen I'm not debugging CUDA errors at 2am, I'm running a strict hypertrophy\nprogram, clearing Elden Ring bosses, or directing AI-generated editorial shoots.\n\nI believe great AI engineering requires both rigorous technical depth\nand strong aesthetic intuition.`,
  'run bio': () => RESPONSES.bio(),
  skills: () =>
    `[ML/AI]        PyTorch · EfficientNet-B0 · Transformers · Multimodal Fusion · GMU\n[Signal Proc]  ECG/PCG Analysis · CWT · Log-Mel · WFDB · MIT-BIH · CinC 2016\n[Generative]   Stable Diffusion Turbo · Diffusers · img2img · Style Transfer\n[Web/Full-Stk] Next.js 14 · TypeScript · Flask · Sanity v3 · Tailwind CSS\n[AI APIs]      Anthropic Claude API · Streaming Responses · Prompt Engineering\n[Infra]        Docker · Linux/WSL2 · Bash · Vercel · Razorpay · Shiprocket\n[Data Sci]     Python · NumPy/Pandas · scikit-learn · Matplotlib · PyGame`,
  'execute skills.py': () => RESPONSES.skills(),
  projects: () =>
    `1. MMA-Net               — Multimodal arrhythmia detection (F1=0.855 · AUC=0.889)\n   └─ EfficientNet-B0 + GMU · ECG+PCG fusion · 5-class AAMI · Minor Project Report\n2. NeuralStyleTransferApp — Local Stable Diffusion Turbo · Flask · Docker\n   └─ Text-to-image + 6-preset style transfer · GPU/CPU auto-detect\n3. Uppucheppa             — Premium e-commerce + Claude AI chatbot (Chitti)\n   └─ Next.js 14 + Sanity v3 + Razorpay + Shiprocket\n4. TicTacToe AI           — Unbeatable Minimax opponent · PyGame`,
  contact: () =>
    `Name    : Davis Asish\nEmail   : voletidavisasish@gmail.com\nGitHub  : github.com/davis-asish\nLinkedIn: linkedin.com/in/davis-asish\n\n> Open to remote and on-site roles in AI/ML engineering.`,
  'cat contact.txt': () => RESPONSES.contact(),
  ls: () => LS_OUTPUT,
  clear: () => '__CLEAR__',
}

function Line({ entry }) {
  if (entry.type === 'input') {
    return (
      <div className="flex items-start gap-2 text-sm">
        <span className="text-cyan-DEFAULT font-mono flex-shrink-0">{PROMPT}</span>
        <span className="text-text-primary font-mono">{entry.text}</span>
      </div>
    )
  }
  if (entry.type === 'error') {
    return (
      <div className="font-mono text-sm text-red-400 pl-2">
        bash: {entry.text}: command not found. Type <span className="text-cyan-DEFAULT">help</span> for available commands.
      </div>
    )
  }
  return (
    <div className="font-mono text-sm text-text-secondary whitespace-pre-wrap pl-2 leading-relaxed">
      {entry.text}
    </div>
  )
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Portfolio Terminal v1.0.0 — Type "help" for available commands.' },
    { type: 'output', text: '─'.repeat(55) },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', text: 'Terminal cleared.' }])
      return
    }

    const responseFn = RESPONSES[trimmed]
    const newEntries = [{ type: 'input', text: cmd.trim() }]

    if (responseFn) {
      const result = responseFn()
      if (result !== '__CLEAR__') {
        newEntries.push({ type: 'output', text: result })
      }
    } else {
      newEntries.push({ type: 'error', text: cmd.trim() })
    }

    setHistory((h) => [...h, ...newEntries])
    setCmdHistory((h) => [cmd.trim(), ...h])
    setHistIdx(-1)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next] ?? '')
    }
  }

  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="terminal" className="py-24 bg-onyx" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-px bg-cyan-DEFAULT" />
            <span className="section-label">Interactive Console</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-heading text-5xl md:text-6xl"
          >
            Terminal Interface
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary mt-4 max-w-xl"
          >
            Recruiters welcome. Try <code className="font-mono text-cyan-DEFAULT text-xs px-1.5 py-0.5 bg-white/5 rounded">run bio</code>,{' '}
            <code className="font-mono text-cyan-DEFAULT text-xs px-1.5 py-0.5 bg-white/5 rounded">execute skills.py</code>, or{' '}
            <code className="font-mono text-cyan-DEFAULT text-xs px-1.5 py-0.5 bg-white/5 rounded">cat contact.txt</code>.
          </motion.p>
        </div>

        {/* Terminal window */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl overflow-hidden border border-white/8 shadow-[0_0_60px_rgba(0,212,255,0.05)]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-3 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs text-text-muted mx-auto">
              portfolio — bash — 80×24
            </span>
          </div>

          {/* Output area */}
          <div className="bg-[#0d0d0d] p-5 h-72 overflow-y-auto space-y-2 font-mono">
            {history.map((entry, i) => (
              <Line key={i} entry={entry} />
            ))}
            {/* Input line */}
            <div className="flex items-center gap-2">
              <span className="text-cyan-DEFAULT font-mono text-sm flex-shrink-0">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-sm caret-cyan-DEFAULT"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              <span className="w-2 h-4 bg-cyan-DEFAULT animate-blink flex-shrink-0" />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
