import { useState } from 'react'
import { useStore } from '../../store/useStore'

export default function ContactForm() {
  const setCurrentView = useStore((state) => state.setCurrentView)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this to a backend
    const mailtoLink = `mailto:your.email@example.com?subject=Contact from Portfolio&body=${encodeURIComponent(formData.message)}`
    window.location.href = mailtoLink
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div className="absolute inset-0 bg-black/80" onClick={() => setCurrentView('menu')} />
      <div className="relative bg-ps2-gray pixel-border gel-highlight p-8 rounded-lg max-w-lg w-full mx-4">
        <button
          onClick={() => setCurrentView('menu')}
          className="absolute top-4 right-4 text-2xl hover:text-ps2-accent transition-colors"
        >
          ×
        </button>
        
        <h2 className="text-3xl pixel-font text-ps2-accent mb-6">INSERT DISC</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 pixel-font mb-2">NAME</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-ps2-dark pixel-border p-3 rounded focus:outline-none focus:border-ps2-accent"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 pixel-font mb-2">EMAIL</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-ps2-dark pixel-border p-3 rounded focus:outline-none focus:border-ps2-accent"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 pixel-font mb-2">MESSAGE</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-ps2-dark pixel-border p-3 rounded focus:outline-none focus:border-ps2-accent h-32 resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-3 bg-ps2-blue hover:bg-ps2-accent transition-colors rounded pixel-border pixel-font"
          >
            SEND
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-ps2-light">
          <div className="text-xs text-gray-400 pixel-font mb-2">OR CONNECT</div>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-ps2-accent transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-ps2-accent transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-ps2-accent transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

