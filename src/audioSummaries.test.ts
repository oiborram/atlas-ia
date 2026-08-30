import { describe, expect, it } from 'vitest'
import { getAudioSummary, getDocumentAudioSummary } from './audioSummaries'
import { categories } from './content'

describe('audio summaries', () => {
  it('covers every Atlas section except the home cover', () => {
    const sectionIds = categories
      .filter((category) => category.id !== 'root')
      .map((category) => category.id)

    expect(sectionIds).toHaveLength(18)
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

  it('only exposes the player on section summary pages', () => {
    expect(getDocumentAudioSummary('01-era-alphago', '01-era-alphago/00-resumen.md')).toBeDefined()
    expect(getDocumentAudioSummary('01-era-alphago', '01-era-alphago/01-alphago-el-punto-de-partida.md')).toBeUndefined()
    expect(getDocumentAudioSummary('10-laboratorios', '10-laboratorios/README.md')).toBeUndefined()
  })
})
