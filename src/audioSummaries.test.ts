import { describe, expect, it } from 'vitest'
import { getAudioSummary, getDocumentAudioSummary } from './audioSummaries'
import { categories } from './content'

describe('audio summaries', () => {
  it('covers every narrated Atlas section', () => {
    const sectionIds = categories
      .filter((category) => category.id !== 'root' && category.id !== 'referencias' && category.id !== '14-ampliacion-avanzada' && category.id !== '15-legal')
      .map((category) => category.id)

    expect(sectionIds).toHaveLength(14)
    for (const categoryId of sectionIds) {
      expect(getAudioSummary(categoryId)).toMatchObject({
        categoryId,
        src: expect.stringContaining(`atlas-${categoryId}.wav`),
      })
    }
  })

  it('does not attach an audio summary to the home cover', () => {
    expect(getAudioSummary('root')).toBeUndefined()
  })

  it('does not attach an audio summary to advanced expansion', () => {
    expect(getAudioSummary('14-ampliacion-avanzada')).toBeUndefined()
    expect(getDocumentAudioSummary('14-ampliacion-avanzada', '14-ampliacion-avanzada/00-resumen.md')).toBeUndefined()
  })

  it('does not attach an audio summary to legal', () => {
    expect(getAudioSummary('15-legal')).toBeUndefined()
    expect(getDocumentAudioSummary('15-legal', '15-legal/00-resumen.md')).toBeUndefined()
  })

  it('does not attach an audio summary to references', () => {
    expect(getAudioSummary('referencias')).toBeUndefined()
    expect(getDocumentAudioSummary('referencias', 'referencias/00-resumen.md')).toBeUndefined()
  })

  it('only exposes the player on section summary pages', () => {
    expect(getDocumentAudioSummary('01-era-alphago', '01-era-alphago/00-resumen.md')).toBeDefined()
    expect(getDocumentAudioSummary('01-era-alphago', '01-era-alphago/01-alphago-el-punto-de-partida.md')).toBeUndefined()
    expect(getDocumentAudioSummary('11-casos-y-experimentos', '11-casos-y-experimentos/README.md')).toBeUndefined()
  })
})
