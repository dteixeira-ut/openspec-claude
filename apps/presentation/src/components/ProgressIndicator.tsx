interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <span className="text-sm font-medium text-white/40 tabular-nums">
      {current} / {total}
    </span>
  )
}
