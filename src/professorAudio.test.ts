import { describe, expect, it } from 'vitest'
import { documents } from './content'
import { buildProfessorTimeline, findProfessorCue, getProfessorAudio, getProfessorAudios, hashMarkdown, hashProfessorNarration, markdownToProfessorText } from './professorAudio'

describe('professor audio', () => {
  it('uses a stable hash across line-ending conventions', () => {
    expect(hashMarkdown('# Título\r\n\r\nTexto.')).toBe(hashMarkdown('# Título\n\nTexto.'))
  })

  it('hashes the text Iris actually narrates rather than inert Markdown details', () => {
    const first = '# Título\n\n[Documentación](https://example.com/old)\n\n```ts\nconst value = 1\n```'
    const second = '# Título\n\n[Documentación](https://example.com/new)\n\n```ts\nconst value = 999\n```'

    expect(markdownToProfessorText(first)).toContain('Bloque de código omitido.')
    expect(hashProfessorNarration(first)).toBe(hashProfessorNarration(second))
    expect(hashProfessorNarration(first)).not.toBe(hashProfessorNarration(first.replace('Título', 'Otro título')))
    expect(hashProfessorNarration('# Título\n\n[Documentación](https://example.com/old)')).toBe('ec7bfba3')
  })

  it('never attaches a professor player to the cover', () => {
    expect(getProfessorAudio('root', documents)).toBeUndefined()
  })

  it('exposes every generated section and reports its freshness', () => {
    const categoryIds = [...new Set(documents.map((document) => document.categoryId))].filter(
      (id) => id !== 'root' && id !== 'referencias' && id !== '14-ampliacion-avanzada' && id !== '15-legal',
    )
    for (const categoryId of categoryIds) {
      expect(getProfessorAudio(categoryId, documents)).toMatchObject({ categoryId, stale: false })
    }
  })

  it('does not attach a professor player to references', () => {
    expect(getProfessorAudio('referencias', documents)).toBeUndefined()
  })

  it('does not attach a professor player to advanced expansion', () => {
    expect(getProfessorAudio('14-ampliacion-avanzada', documents)).toBeUndefined()
  })

  it('does not attach a professor player to legal', () => {
    expect(getProfessorAudio('15-legal', documents)).toBeUndefined()
  })

  it('builds an ordered document and heading timeline for guided playback', () => {
    const audio = getProfessorAudio('01-era-alphago', documents)!
    const timeline = buildProfessorTimeline(audio, documents)
    const documentCues = timeline.filter((cue) => cue.kind === 'document')

    expect(documentCues.map((cue) => cue.path)).toEqual(audio.sources.map((source) => source.path))
    expect(timeline[0].startTime).toBe(0)
    expect(timeline.some((cue) => cue.kind === 'heading' && cue.anchor)).toBe(true)
    expect(findProfessorCue(timeline, documentCues[1].startTime)?.path).toBe(documentCues[1].path)
    expect(timeline.every((cue, index) => index === 0 || cue.startTime >= timeline[index - 1].startTime)).toBe(true)
  })

  it('lists the fourteen narrated sections as a continuous playlist', () => {
    expect(getProfessorAudios(documents)).toHaveLength(14)
  })
})
