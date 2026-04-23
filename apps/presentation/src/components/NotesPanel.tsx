interface NotesPanelProps {
  notes: string | undefined
}

export function NotesPanel({ notes }: NotesPanelProps) {
  if (!notes) return null
  return (
    <div className="w-full max-w-4xl rounded-xl border border-ut-purple-light bg-ut-purple-light/40 px-8 py-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ut-purple">
        Speaker Notes
      </p>
      <p className="text-gray-700 leading-relaxed">{notes}</p>
    </div>
  )
}
