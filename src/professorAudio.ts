import manifest from './professorAudioManifest.json'
import { toPlainText, type CourseDocument } from './content'

export interface ProfessorAudioSource {
  path: string
  sourceHash?: string
  narrationHash?: string
  hash?: string
  lastModifiedAt: string
}

interface ProfessorAudioEntry {
  categoryId: string
  title: string
  src: string
  generatedAt: string
  sourceLastModifiedAt: string
  durationSeconds: number
  audioSha256?: string
  sources: ProfessorAudioSource[]
}

export interface ProfessorAudio extends ProfessorAudioEntry {
  stale: boolean
  staleSources: string[]
}

export interface ProfessorCue {
  key: string
  categoryId: string
  path: string
  title: string
  anchor?: string
  label: string
  kind: 'document' | 'heading'
  startTime: number
  endTime: number
}

export function hashMarkdown(content: string): string {
  let hash = 5381
  const normalized = content.replace(/\r\n?/g, '\n')
  for (let index = 0; index < normalized.length; index += 1) {
    hash = (Math.imul(hash, 33) ^ normalized.charCodeAt(index)) >>> 0
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

export function markdownToProfessorText(markdown: string): string {
  return markdown
    .replace(/\r\n?/g, '\n')
    .replace(/```[\s\S]*?```/g, '\nBloque de código omitido.\n')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/gm, (_match, _marks, title: string) => `... ${title.trim()}. ...`)
    .replace(/^\s*\|(.+)\|\s*$/gm, (_match, row: string) => {
      const cells = row.split('|').map((cell) => cell.trim()).filter((cell) => cell && !/^:?-{3,}:?$/.test(cell))
      return cells.length ? `${cells.join('. ')}.` : ''
    })
    .replace(/^\s*[-*_]{3,}\s*$/gm, '...')
    .replace(/^\s*(?:[-*+] |\d+[.)] )/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' enlace ')
    .replace(/[`*_~]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function hashProfessorNarration(markdown: string): string {
  return hashMarkdown(markdownToProfessorText(markdown))
}

export function getProfessorAudio(categoryId: string, documents: CourseDocument[]): ProfessorAudio | undefined {
  if (
    categoryId === 'root'
    || categoryId === 'referencias'
    || categoryId === '14-ampliacion-avanzada'
    || categoryId === '15-legal'
  ) return undefined
  const entry = (manifest.sections as ProfessorAudioEntry[]).find((candidate) => candidate.categoryId === categoryId)
  if (!entry) return undefined

  const expected = new Map(entry.sources.map((source) => [source.path, source.narrationHash || source.sourceHash || source.hash]))
  const current = documents.filter((document) => document.categoryId === categoryId)
  const staleSources = current
    .filter((document) => {
      const source = entry.sources.find((candidate) => candidate.path === document.path)
      const actualHash = source?.narrationHash ? hashProfessorNarration(document.content) : hashMarkdown(document.content)
      return expected.get(document.path) !== actualHash
    })
    .map((document) => document.path)

  for (const source of entry.sources) {
    if (!current.some((document) => document.path === source.path)) staleSources.push(source.path)
  }

  return {
    ...entry,
    src: `${import.meta.env.BASE_URL}${entry.src}`,
    stale: staleSources.length > 0,
    staleSources,
  }
}

export function getProfessorAudios(documents: CourseDocument[]): ProfessorAudio[] {
  return (manifest.sections as ProfessorAudioEntry[])
    .map((entry) => getProfessorAudio(entry.categoryId, documents))
    .filter((entry): entry is ProfessorAudio => Boolean(entry))
}

function findHeadingOffset(content: string, heading: string): number {
  const normalizedHeading = heading.replace(/[`*_]/g, '').trim().toLocaleLowerCase('es')
  const lines = content.replace(/\r\n?/g, '\n').split('\n')
  let offset = 0
  for (const line of lines) {
    const candidate = line.replace(/^#{1,6}\s+/, '').replace(/\s+#+$/, '').replace(/[`*_]/g, '').trim().toLocaleLowerCase('es')
    if (candidate === normalizedHeading) return offset
    offset += line.length + 1
  }
  return 0
}

export function buildProfessorTimeline(audio: ProfessorAudio, documents: CourseDocument[]): ProfessorCue[] {
  const orderedDocuments = audio.sources
    .map((source) => documents.find((document) => document.path === source.path))
    .filter((document): document is CourseDocument => Boolean(document))
  if (!orderedDocuments.length || audio.durationSeconds <= 0) return []

  const weights = orderedDocuments.map((document) => Math.max(120, toPlainText(document.content).length))
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  const cues: ProfessorCue[] = []
  let cursor = 0

  orderedDocuments.forEach((document, index) => {
    const documentDuration = index === orderedDocuments.length - 1
      ? audio.durationSeconds - cursor
      : audio.durationSeconds * (weights[index] / totalWeight)
    const documentStart = cursor
    const documentEnd = Math.min(audio.durationSeconds, documentStart + documentDuration)
    cues.push({
      key: `${document.path}:document`,
      categoryId: audio.categoryId,
      path: document.path,
      title: document.title,
      label: document.title,
      kind: 'document',
      startTime: documentStart,
      endTime: documentEnd,
    })

    const contentLength = Math.max(1, document.content.length)
    for (const heading of document.headings.filter((candidate) => candidate.depth <= 3)) {
      const localRatio = Math.max(0, Math.min(1, findHeadingOffset(document.content, heading.text) / contentLength))
      const startTime = documentStart + documentDuration * localRatio
      if (startTime - documentStart < 2) continue
      cues.push({
        key: `${document.path}:${heading.id}`,
        categoryId: audio.categoryId,
        path: document.path,
        title: document.title,
        anchor: heading.id,
        label: heading.text,
        kind: 'heading',
        startTime,
        endTime: documentEnd,
      })
    }
    cursor = documentEnd
  })

  cues.sort((left, right) => left.startTime - right.startTime || (left.kind === 'document' ? -1 : 1))
  return cues.map((cue, index) => ({
    ...cue,
    endTime: cues[index + 1]?.startTime ?? audio.durationSeconds,
  }))
}

export function findProfessorCue(timeline: ProfessorCue[], currentTime: number): ProfessorCue | undefined {
  for (let index = timeline.length - 1; index >= 0; index -= 1) {
    if (currentTime >= timeline[index].startTime) return timeline[index]
  }
  return timeline[0]
}
