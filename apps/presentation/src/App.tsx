import { useEffect, useState } from 'react'
import { SlideCard } from './components/SlideCard'
import { NavControls } from './components/NavControls'
import { ProgressIndicator } from './components/ProgressIndicator'
import { NotesPanel } from './components/NotesPanel'
import { slides } from './slides'

export default function App() {
  const [current, setCurrent] = useState(0)
  const [notesOpen, setNotesOpen] = useState(false)

  const canPrev = current > 0
  const canNext = current < slides.length - 1

  function prev() {
    if (canPrev) setCurrent((c) => c - 1)
  }

  function next() {
    if (canNext) setCurrent((c) => c + 1)
  }

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'l') next()
      if (e.key === 'ArrowLeft' || e.key === 'h') prev()
      if (e.key === 'n') setNotesOpen((o) => !o)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const slide = slides[current]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10 gap-6 font-sans">
      <div className="w-full max-w-4xl" key={current}>
        <SlideCard slide={slide} slideIndex={current} />
      </div>

      {notesOpen && (
        <div className="w-full max-w-4xl">
          <NotesPanel notes={slide.notes} />
        </div>
      )}

      <div className="flex items-center gap-6">
        <NavControls onPrev={prev} onNext={next} canPrev={canPrev} canNext={canNext} />
        <ProgressIndicator current={current + 1} total={slides.length} />
        <button
          onClick={() => setNotesOpen((o) => !o)}
          aria-label="Toggle speaker notes"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-ut-purple hover:text-ut-purple transition-colors"
        >
          {notesOpen ? 'Hide Notes' : 'Notes'}
        </button>
      </div>
    </div>
  )
}
