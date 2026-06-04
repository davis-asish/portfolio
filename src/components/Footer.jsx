import { motion } from 'framer-motion'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/davis-asish', mono: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/davis-asish', mono: 'LI' },
  { label: 'Email', href: 'mailto:voletidavisasish@gmail.com', mono: '@' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-onyx">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-6 items-start mb-12">
          {/* Left: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-DEFAULT to-violet-DEFAULT flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-onyx">AI</span>
              </div>
              <span className="font-serif text-lg font-semibold text-text-primary">Davis Asish</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Junior AI/ML Engineer. Building at the intersection of deep learning, biomedical signal processing, and full-stack AI applications.
            </p>
          </div>

          {/* Center: Links */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">Navigation</p>
            {['Work', 'Skills', 'About', 'Timeline', 'Terminal'].map((link) => (
              <button
                key={link}
                onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                className="text-text-secondary text-sm hover:text-text-primary transition-colors text-left"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right: Contact */}
          <div>
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Connect</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span className="w-7 h-7 rounded bg-white/5 border border-white/5 flex items-center justify-center font-mono text-xs group-hover:border-white/15 transition-colors">
                    {link.mono}
                  </span>
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-text-muted">
              <span className="text-xs">◎</span>
              <span className="font-mono text-xs">India · Remote OK</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Davis Asish — Engineered with precision.
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              className="font-mono text-xs text-cyan-DEFAULT hover:underline tracking-wide"
            >
              Download Resume
            </motion.a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
