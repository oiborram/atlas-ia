import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AudioSummary } from './AudioSummary'

const summary = {
  categoryId: '01-era-alphago',
  title: 'La era AlphaGo',
  src: './audio/atlas-01-era-alphago.wav',
}

describe('AudioSummary', () => {
  const play = vi.fn().mockResolvedValue(undefined)
  const pause = vi.fn()

  beforeEach(() => {
    play.mockClear()
    pause.mockClear()
    Object.defineProperty(HTMLMediaElement.prototype, 'play', { configurable: true, value: play })
    Object.defineProperty(HTMLMediaElement.prototype, 'pause', { configurable: true, value: pause })
  })

  it('loads metadata without starting playback', () => {
    const { container } = render(<AudioSummary summary={summary} />)

    expect(container.querySelector('audio')).toHaveAttribute('preload', 'metadata')
    expect(container.querySelector('audio')).toHaveAttribute('src', summary.src)
    expect(play).not.toHaveBeenCalled()
  })

  it('starts playback only after pressing the play button', () => {
    render(<AudioSummary summary={summary} />)

    fireEvent.click(screen.getByRole('button', { name: 'Escuchar resumen de La era AlphaGo' }))

    expect(play).toHaveBeenCalledOnce()
  })
})
