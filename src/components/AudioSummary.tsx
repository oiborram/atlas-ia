import { useEffect, useRef, useState } from 'react'
import { Pause, Play, SpeakerHigh, WarningCircle } from '@phosphor-icons/react'
import type { AudioSummary as AudioSummaryData } from '../audioSummaries'

interface AudioSummaryProps {
  summary: AudioSummaryData
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '—:—'
  const rounded = Math.floor(seconds)
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`
}

export function AudioSummary({ summary }: AudioSummaryProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio?.pause()
    }
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || failed) return

    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      await audio.play()
    } catch {
      setFailed(true)
      setPlaying(false)
    }
  }

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0
  const actionLabel = failed
    ? 'El resumen en audio no está disponible'
    : playing
      ? `Pausar resumen de ${summary.title}`
      : `Escuchar resumen de ${summary.title}`

  return (
    <aside className={`audio-summary ${playing ? 'is-playing' : ''} ${failed ? 'has-error' : ''}`} aria-label="Resumen en audio de la sección">
      <audio
        ref={audioRef}
        src={summary.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0
          setPlaying(false)
          setCurrentTime(0)
        }}
        onError={() => setFailed(true)}
      />
      <button type="button" onClick={togglePlayback} aria-label={actionLabel} aria-pressed={playing} disabled={failed}>
        <span className="audio-summary-control" aria-hidden="true">
          {failed ? <WarningCircle size={20} /> : playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
        </span>
        <span className="audio-summary-copy">
          <span className="audio-summary-label"><SpeakerHigh size={15} aria-hidden="true" /> Resumen de la sección</span>
          <strong>{failed ? 'Audio no disponible' : playing ? 'Escuchando ahora' : 'Escuchar antes de leer'}</strong>
        </span>
        <span className="audio-summary-time" aria-hidden="true">
          {playing ? `${formatTime(currentTime)} / ` : ''}{formatTime(duration)}
        </span>
      </button>
      <span className="audio-summary-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {failed ? 'No se ha podido cargar el audio.' : playing ? 'Reproduciendo resumen.' : 'Resumen pausado.'}
      </span>
    </aside>
  )
}
