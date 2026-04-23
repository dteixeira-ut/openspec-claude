interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <span className="text-sm font-medium text-gray-400">
      {current} / {total}
    </span>
  )
}
