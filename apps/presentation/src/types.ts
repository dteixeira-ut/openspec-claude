export type ContentItem =
  | { type: 'text'; content: string }
  | { type: 'subheading'; content: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'code'; content: string }
  | { type: 'link'; label: string; href: string }
  | { type: 'section'; title: string; links: { label: string; href: string }[] }
  | { type: 'footer'; content: string }

export interface Slide {
  id: string
  title: string
  body: ContentItem[]
  notes?: string
}
