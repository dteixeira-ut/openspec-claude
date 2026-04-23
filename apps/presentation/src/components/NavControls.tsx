interface NavControlsProps {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
}

export function NavControls({ onPrev, onNext, canPrev, canNext }: NavControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous slide"
        className="rounded-lg border-2 border-ut-purple px-5 py-2 font-semibold text-ut-purple transition-colors hover:bg-ut-purple-light disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next slide"
        className="rounded-lg bg-ut-purple px-5 py-2 font-semibold text-white transition-colors hover:bg-ut-purple-dark disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  )
}
