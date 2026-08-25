import GithubSlugger from 'github-slugger'

export interface Heading {
  depth: number
  text: string
  id: string
}

export interface CourseDocument {
  id: string
  path: string
  title: string
  description: string
  content: string
  categoryId: string
  categoryLabel: string
  index: number
  readingMinutes: number
  headings: Heading[]
}

export interface CourseCategory {
  id: string
  label: string
  shortLabel: string
  index: number
  documents: CourseDocument[]
}

const markdownModules = import.meta.glob(
  [
    '../README.md',
    '../00-guia/*.md',
    '../01-era-alphago/*.md',
    '../02-era-transformer/*.md',
    '../03-era-chatgpt/*.md',
    '../04-era-ia-local/*.md',
    '../05-era-thinking/*.md',
    '../06-era-agent-tools/*.md',
    '../07-era-mcp/*.md',
    '../08-era-agentes-autonomos/*.md',
    '../09-impacto-y-productos/*.md',
    '../10-laboratorios/*.md',
    '../11-casos-y-experimentos/*.md',
    '../12-codex/*.md',
    '../13-prompting-loop-graph-engineering/*.md',
    '../14-ampliacion-avanzada/*.md',
    '../15-legal/*.md',
    '../referencias/*.md',
  ],
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>

export const CATEGORY_META: Record<string, { label: string; shortLabel: string; index: number }> = {
  root: { label: 'Inicio', shortLabel: 'Atlas', index: 0 },
  '00-guia': { label: 'Guía del curso', shortLabel: 'Guía', index: 1 },
  '01-era-alphago': { label: 'Era AlphaGo', shortLabel: 'AlphaGo', index: 2 },
  '02-era-transformer': { label: 'Era Transformer', shortLabel: 'Transformer', index: 3 },
  '03-era-chatgpt': { label: 'Era ChatGPT', shortLabel: 'ChatGPT', index: 4 },
  '04-era-ia-local': { label: 'Era IA local', shortLabel: 'IA local', index: 5 },
  '05-era-thinking': { label: 'Era Thinking', shortLabel: 'Thinking', index: 6 },
  '06-era-agent-tools': { label: 'Era Agent Tools', shortLabel: 'Tools', index: 7 },
  '07-era-mcp': { label: 'Era MCP', shortLabel: 'MCP', index: 8 },
  '08-era-agentes-autonomos': { label: 'Agentes autónomos', shortLabel: 'Agentes', index: 9 },
  '09-impacto-y-productos': { label: 'Impacto y productos', shortLabel: 'Impacto', index: 10 },
  '10-laboratorios': { label: 'Laboratorios', shortLabel: 'Labs', index: 11 },
  '11-casos-y-experimentos': { label: 'Casos y experimentos', shortLabel: 'Casos', index: 12 },
  '12-codex': { label: 'Uso de Codex', shortLabel: 'Codex', index: 13 },
  '13-prompting-loop-graph-engineering': { label: 'Prompting, loops y grafos', shortLabel: 'Prompting', index: 14 },
  '14-ampliacion-avanzada': { label: 'Ampliación avanzada', shortLabel: 'Avanzado', index: 15 },
  '15-legal': { label: 'Legal y gobernanza', shortLabel: 'Legal', index: 16 },
  referencias: { label: 'Referencias', shortLabel: 'Referencias', index: 17 },
}

export function extractTitle(content: string, fallback: string): string {
  return content.match(/^#\s+(.+)$/m)?.[1]?.replace(/[`*_]/g, '').trim() || fallback
}

export function toPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractDescription(content: string): string {
  const plain = toPlainText(
    content
      .split('\n')
      .filter((line) => !line.startsWith('#') && !line.startsWith('```') && !line.startsWith('|'))
      .join(' '),
  )
  return plain.length > 180 ? `${plain.slice(0, 177).trim()}...` : plain
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger()
  let inCode = false
  const headings: Heading[] = []

  for (const line of content.split('\n')) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode) continue
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (!match) continue
    const text = match[2].replace(/[`*_]/g, '').replace(/\s+#+$/, '').trim()
    headings.push({ depth: match[1].length, text, id: slugger.slug(text) })
  }
  return headings
}

function normalizePath(rawPath: string): string {
  return rawPath.replace(/^\.\.\//, '').replace(/\\/g, '/')
}

function createDocument([rawPath, content]: [string, string]): CourseDocument {
  const path = normalizePath(rawPath)
  const segments = path.split('/')
  const filename = segments.at(-1)?.replace(/\.md$/, '') || 'documento'
  const categoryId = segments.length === 1 ? 'root' : segments[0]
  const meta = CATEGORY_META[categoryId] || {
    label: categoryId,
    shortLabel: categoryId,
    index: 99,
  }
  const fileOrder = filename === 'README' ? 0 : Number.parseInt(filename, 10) || 99
  const words = toPlainText(content).split(/\s+/).filter(Boolean).length

  return {
    id: path,
    path,
    title: extractTitle(content, filename),
    description: extractDescription(content),
    content,
    categoryId,
    categoryLabel: meta.label,
    index: meta.index * 100 + fileOrder,
    readingMinutes: Math.max(1, Math.ceil(words / 220)),
    headings: extractHeadings(content),
  }
}

export const documents = Object.entries(markdownModules).map(createDocument).sort((a, b) => a.index - b.index)

export const categories: CourseCategory[] = Object.entries(CATEGORY_META)
  .map(([id, meta]) => ({
    id,
    ...meta,
    documents: documents.filter((document) => document.categoryId === id),
  }))
  .filter((category) => category.documents.length > 0)
  .sort((a, b) => a.index - b.index)

export const homeDocument = documents.find((document) => document.path === 'README.md') || documents[0]

export function resolveDocumentPath(currentPath: string, href: string): { path: string; anchor?: string } | null {
  const [rawTarget, anchor] = href.split('#')
  if (!rawTarget) return { path: currentPath, anchor }
  if (!rawTarget.toLowerCase().endsWith('.md')) return null

  const parts = rawTarget.startsWith('/') ? [] : currentPath.split('/').slice(0, -1)
  for (const part of decodeURIComponent(rawTarget).replace(/^\//, '').split('/')) {
    if (!part || part === '.') continue
    if (part === '..') parts.pop()
    else parts.push(part)
  }

  const path = parts.join('/')
  return documents.some((document) => document.path === path) ? { path, anchor } : null
}

export function getDocumentNeighbors(document: CourseDocument) {
  const index = documents.findIndex((candidate) => candidate.path === document.path)
  return {
    previous: index > 0 ? documents[index - 1] : undefined,
    next: index < documents.length - 1 ? documents[index + 1] : undefined,
  }
}

