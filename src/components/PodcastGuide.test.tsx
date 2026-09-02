import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { documents } from '../content'
import { buildProfessorTimeline, getProfessorAudios } from '../professorAudio'
import { PodcastGuide } from './PodcastGuide'

const audios = getProfessorAudios(documents)
const currentAudio = audios.find((audio) => audio.categoryId === '01-era-alphago')!

function renderGuide(audio = currentAudio) {
  const onNavigate = vi.fn()
  const result = render(
    <PodcastGuide
      audios={[audio]}
      documents={documents}
      contextCategoryId={audio.categoryId}
      stageMode={false}
      onStageModeChange={vi.fn()}
      onNavigate={onNavigate}
    />,
  )
  return { onNavigate, container: result.container }
}

describe('PodcastGuide', () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('exposes continuous guide controls without autoplay', () => {
    const { container } = renderGuide()
    expect(container.querySelector('audio')).toHaveAttribute('preload', 'metadata')
    expect(screen.getByText('Modo podcast')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reproducir modo podcast' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Seguir lectura' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Continuo' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('uses the existing audio only after a user action', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
    renderGuide()
    fireEvent.click(screen.getByRole('button', { name: 'Reproducir modo podcast' }))
    expect(play).toHaveBeenCalledOnce()
  })

  it('can collapse into a compact pet and expand again', () => {
    renderGuide()
    fireEvent.click(screen.getByRole('button', { name: 'Minimizar como pet' }))
    expect(screen.getByRole('button', { name: 'Mostrar controles del podcast' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar controles del podcast' }))
    expect(screen.getByText('Modo podcast')).toBeInTheDocument()
  })

  it('blocks a stale section and explains why', () => {
    renderGuide({ ...currentAudio, stale: true, staleSources: [currentAudio.sources[0].path] })
    expect(screen.getByText('Este audio no coincide con los Markdown actuales.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reproducir modo podcast' })).not.toBeInTheDocument()
  })

  it('navigates to the document being narrated as playback advances', () => {
    const { container, onNavigate } = renderGuide()
    const documentCues = buildProfessorTimeline(currentAudio, documents).filter((cue) => cue.kind === 'document')
    const targetCue = documentCues[1]
    const element = container.querySelector('audio')!

    element.currentTime = targetCue.startTime + 0.1
    fireEvent.timeUpdate(element)

    expect(onNavigate).toHaveBeenLastCalledWith(targetCue.path, undefined, { replace: true, guided: true })
  })

  it('continues with the next available section when an audio ends', () => {
    const nextAudio = audios.find((audio) => audio.categoryId === '05-era-thinking')!
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
    const onNavigate = vi.fn()
    const { container } = render(
      <PodcastGuide
        audios={[currentAudio, nextAudio]}
        documents={documents}
        contextCategoryId={currentAudio.categoryId}
        stageMode={false}
        onStageModeChange={vi.fn()}
        onNavigate={onNavigate}
      />,
    )

    const element = container.querySelector('audio')!
    fireEvent.ended(element)
    fireEvent.canPlay(element)

    expect(screen.getByRole('combobox', { name: 'Sección del podcast' })).toHaveValue(nextAudio.categoryId)
    expect(onNavigate).toHaveBeenCalledWith(nextAudio.sources[0].path, undefined, { replace: true, guided: true })
    expect(play).toHaveBeenCalledOnce()
  })
})
