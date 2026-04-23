import type { ContentItem, Slide } from '../types'

function renderItem(item: ContentItem, index: number) {
  switch (item.type) {
    case 'text':
      return (
        <p key={index} className="text-gray-600 text-lg leading-relaxed">
          {item.content}
        </p>
      )
    case 'subheading':
      return (
        <p key={index} className="text-ut-purple font-semibold text-xl">
          {item.content}
        </p>
      )
    case 'bullets':
      return (
        <ul key={index} className="space-y-3">
          {item.items.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ut-purple" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )
    case 'numbered':
      return (
        <ol key={index} className="space-y-3">
          {item.items.map((q, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
              <span className="shrink-0 font-bold text-ut-purple">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      )
    case 'code':
      return (
        <pre
          key={index}
          className="rounded-lg bg-gray-900 px-5 py-4 font-mono text-sm text-green-400 overflow-x-auto"
        >
          <code>{item.content}</code>
        </pre>
      )
    case 'link':
      return (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-ut-purple font-medium hover:text-ut-purple-dark underline underline-offset-2"
        >
          {item.label}
        </a>
      )
    case 'section':
      return (
        <div key={index} className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
            {item.title}
          </p>
          <ul className="space-y-1">
            {item.links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ut-purple font-medium hover:text-ut-purple-dark underline underline-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'footer':
      return (
        <p key={index} className="text-sm italic text-gray-400 border-t border-gray-100 pt-4">
          {item.content}
        </p>
      )
  }
}

interface SlideCardProps {
  slide: Slide
  slideIndex: number
}

export function SlideCard({ slide, slideIndex }: SlideCardProps) {
  return (
    <section
      role="region"
      aria-label={slide.title}
      key={slideIndex}
      className="w-full max-w-4xl rounded-2xl bg-white shadow-lg p-10 md:p-14 space-y-6 transition-opacity duration-300"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-ut-purple leading-tight">{slide.title}</h1>
      <div className="space-y-5">{slide.body.map((item, i) => renderItem(item, i))}</div>
    </section>
  )
}
