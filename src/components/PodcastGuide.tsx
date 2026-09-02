import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Headphones,
  Pause,
  Play,
  Presentation,
  SkipBack,
  SkipForward,
  WarningCircle,
  Waveform,
} from '@phosphor-icons/react'
import type { CourseDocument } from '../content'
import {
  buildProfessorTimeline,
  findProfessorCue,
  type ProfessorAudio,
  type ProfessorCue,
} from '../professorAudio'

interface GuideNavigationOptions {
  replace?: boolean
  guided?: boolean
}

interface PodcastGuideProps {
  audios: ProfessorAudio[]
  documents: CourseDocument[]
  contextCategoryId: string
  stageMode: boolean
  onStageModeChange: (enabled: boolean) => void
  onNavigate: (path: string, anchor?: string, options?: GuideNavigationOptions) => void
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '—:—'
  const rounded = Math.floor(seconds)
  const hours = Math.floor(rounded / 3600)
  const minutes = Math.floor((rounded % 3600) / 60)
  const secondsPart = String(rounded % 60).padStart(2, '0')
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, '0')}:${secondsPart}` : `${minutes}:${secondsPart}`
}

function readStoredBoolean(key: string, fallback: boolean): boolean {
  const value = window.localStorage.getItem(key)
  return value === null ? fallback : value === 'true'
}

export function PodcastGuide({
  audios,
  documents,
  contextCategoryId,
  stageMode,
  onStageModeChange,
  onNavigate,
}: PodcastGuideProps) {
  const contextIndex = audios.findIndex((audio) => audio.categoryId === contextCategoryId)
  const firstPlayableIndex = audios.findIndex((audio) => !audio.stale)
  const initialIndex = contextIndex >= 0 ? contextIndex : Math.max(0, firstPlayableIndex)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [minimized, setMinimized] = useState(() => readStoredBoolean('atlas-podcast-minimized', contextCategoryId === 'root'))
  const [followAlong, setFollowAlong] = useState(() => readStoredBoolean('atlas-podcast-follow', true))
  const [continuous, setContinuous] = useState(() => readStoredBoolean('atlas-podcast-continuous', true))
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [failed, setFailed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const lastCueRef = useRef('')
  const pendingPlayRef = useRef(false)
  const previousContextCategoryRef = useRef(contextCategoryId)
  const reduceMotion = useReducedMotion()
  const activeAudio = audios[activeIndex] ?? audios[0]
  const timeline = useMemo(
    () => activeAudio ? buildProfessorTimeline(activeAudio, documents) : [],
    [activeAudio, documents],
  )
  const documentCues = useMemo(() => timeline.filter((cue) => cue.kind === 'document'), [timeline])
  const currentCue = findProfessorCue(timeline, currentTime)
  const unavailable = !activeAudio || activeAudio.stale || failed

  const followCue = useCallback((cue?: ProfessorCue, force = false) => {
    if (!cue || !followAlong || (!force && lastCueRef.current === cue.key)) return
    lastCueRef.current = cue.key
    onNavigate(cue.path, cue.anchor, { replace: true, guided: true })
  }, [followAlong, onNavigate])

  const selectSection = useCallback((index: number, playAfterLoad = false) => {
    const nextAudio = audios[index]
    if (!nextAudio) return
    pendingPlayRef.current = playAfterLoad && !nextAudio.stale
    lastCueRef.current = ''
    setActiveIndex(index)
    const firstDocument = nextAudio.sources[0]?.path
    if (followAlong && firstDocument) onNavigate(firstDocument, undefined, { replace: true, guided: true })
  }, [audios, followAlong, onNavigate])

  useEffect(() => {
    if (previousContextCategoryRef.current === contextCategoryId) return
    previousContextCategoryRef.current = contextCategoryId
    if (playing) return
    const contextIndex = audios.findIndex((audio) => audio.categoryId === contextCategoryId)
    if (contextIndex >= 0) setActiveIndex(contextIndex)
  }, [audios, contextCategoryId, playing])

  useEffect(() => {
    setPlaying(false)
    setCurrentTime(0)
    setDuration(activeAudio?.durationSeconds ?? 0)
    setFailed(false)
    lastCueRef.current = ''
  }, [activeAudio?.categoryId, activeAudio?.durationSeconds])

  useEffect(() => () => audioRef.current?.pause(), [])

  useEffect(() => window.localStorage.setItem('atlas-podcast-minimized', String(minimized)), [minimized])
  useEffect(() => window.localStorage.setItem('atlas-podcast-follow', String(followAlong)), [followAlong])
  useEffect(() => window.localStorage.setItem('atlas-podcast-continuous', String(continuous)), [continuous])

  const startPlayback = async () => {
    const element = audioRef.current
    if (!element || unavailable) return
    globalThis.document.querySelectorAll('audio').forEach((candidate) => {
      if (candidate !== element) candidate.pause()
    })
    try {
      await element.play()
      followCue(findProfessorCue(timeline, element.currentTime), true)
    } catch {
      setFailed(true)
      setPlaying(false)
    }
  }

  const togglePlayback = () => {
    const element = audioRef.current
    if (!element || unavailable) return
    if (!element.paused) element.pause()
    else void startPlayback()
  }

  const jumpDocument = (direction: -1 | 1) => {
    const element = audioRef.current
    if (!element || !documentCues.length) return
    const currentDocumentIndex = Math.max(0, documentCues.findIndex((cue) => cue.path === currentCue?.path))
    const target = documentCues[Math.max(0, Math.min(documentCues.length - 1, currentDocumentIndex + direction))]
    element.currentTime = Math.min(duration, target.startTime + 0.05)
    setCurrentTime(element.currentTime)
    followCue(target, true)
  }

  const playNextSection = () => {
    if (!continuous) {
      setPlaying(false)
      setCurrentTime(0)
      return
    }
    const nextIndex = audios.findIndex((audio, index) => index > activeIndex && !audio.stale)
    if (nextIndex >= 0) selectSection(nextIndex, true)
    else {
      setPlaying(false)
      setCurrentTime(duration)
    }
  }

  if (!activeAudio) return null

  const status = activeAudio.stale
    ? 'Pendiente de actualizar'
    : failed
      ? 'Audio no disponible'
      : playing
        ? 'Guiando la lectura'
        : 'Listo para comenzar'
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0

  return (
    <motion.aside
      layout
      className={`podcast-guide ${minimized ? 'is-minimized' : ''} ${playing ? 'is-playing' : ''} ${unavailable ? 'has-warning' : ''}`}
      aria-label="Modo podcast y guía automática del Atlas"
      transition={reduceMotion ? { duration: 0 } : { layout: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
    >
      <audio
        ref={audioRef}
        src={activeAudio.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onCanPlay={() => {
          if (!pendingPlayRef.current) return
          pendingPlayRef.current = false
          void startPlayback()
        }}
        onTimeUpdate={(event) => {
          const nextTime = event.currentTarget.currentTime
          setCurrentTime(nextTime)
          followCue(findProfessorCue(timeline, nextTime))
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={playNextSection}
        onError={() => setFailed(true)}
      />

      <AnimatePresence initial={false} mode="popLayout">
        {minimized ? (
          <motion.div
            key="pet"
            className="podcast-pet"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          >
            <button
              className="podcast-pet-play"
              type="button"
              onClick={togglePlayback}
              disabled={unavailable}
              aria-label={unavailable ? status : playing ? 'Pausar modo podcast' : 'Reproducir modo podcast'}
              title={`${activeAudio.title}: ${status}`}
            >
              <span className="podcast-pet-progress" style={{ '--podcast-progress': `${progress * 360}deg` } as React.CSSProperties} />
              {unavailable ? <WarningCircle size={21} /> : playing ? <Pause size={18} weight="fill" /> : <Headphones size={21} weight="duotone" />}
            </button>
            <button className="podcast-expand" type="button" onClick={() => setMinimized(false)} aria-label="Mostrar controles del podcast">
              <CaretUp size={13} weight="bold" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="panel"
            className="podcast-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          >
            <header className="podcast-header">
              <span className="podcast-brand"><Waveform size={18} weight="bold" /> Modo podcast</span>
              <button type="button" onClick={() => setMinimized(true)} aria-label="Minimizar como pet" title="Minimizar como pet">
                <CaretDown size={16} weight="bold" />
              </button>
            </header>

            <div className="podcast-context">
              <select
                value={activeAudio.categoryId}
                onChange={(event) => selectSection(audios.findIndex((audio) => audio.categoryId === event.target.value))}
                aria-label="Sección del podcast"
              >
                {audios.map((audio) => (
                  <option key={audio.categoryId} value={audio.categoryId}>
                    {audio.title}{audio.stale ? ' — actualizar' : ''}
                  </option>
                ))}
              </select>
              <strong>{currentCue?.title ?? activeAudio.title}</strong>
              <span>{currentCue?.kind === 'heading' ? currentCue.label : status}</span>
            </div>

            {activeAudio.stale ? (
              <div className="podcast-warning" role="status">
                <WarningCircle size={18} />
                <span>Este audio no coincide con los Markdown actuales.</span>
              </div>
            ) : (
              <>
                <div className="podcast-transport">
                  <button type="button" onClick={() => jumpDocument(-1)} disabled={documentCues.length < 2} aria-label="Documento anterior">
                    <SkipBack size={18} weight="fill" />
                  </button>
                  <button className="podcast-main-control" type="button" onClick={togglePlayback} aria-label={playing ? 'Pausar modo podcast' : 'Reproducir modo podcast'}>
                    {playing ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
                  </button>
                  <button type="button" onClick={() => jumpDocument(1)} disabled={documentCues.length < 2} aria-label="Documento siguiente">
                    <SkipForward size={18} weight="fill" />
                  </button>
                </div>

                <div className="podcast-scrubber">
                  <input
                    type="range"
                    min="0"
                    max={Math.max(1, duration)}
                    step="0.1"
                    value={Math.min(currentTime, Math.max(1, duration))}
                    onChange={(event) => {
                      const nextTime = Number(event.target.value)
                      if (audioRef.current) audioRef.current.currentTime = nextTime
                      setCurrentTime(nextTime)
                      followCue(findProfessorCue(timeline, nextTime), true)
                    }}
                    aria-label="Posición del podcast"
                    style={{ '--podcast-progress': `${progress * 100}%` } as React.CSSProperties}
                  />
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
              </>
            )}

            <div className="podcast-options">
              <button
                type="button"
                className={followAlong ? 'is-active' : ''}
                onClick={() => setFollowAlong((value) => !value)}
                aria-pressed={followAlong}
              >
                {followAlong ? <CaretRight size={13} weight="bold" /> : <CaretLeft size={13} />}
                Seguir lectura
              </button>
              <button
                type="button"
                className={continuous ? 'is-active' : ''}
                onClick={() => setContinuous((value) => !value)}
                aria-pressed={continuous}
              >
                <Headphones size={14} /> Continuo
              </button>
              <button
                type="button"
                className={stageMode ? 'is-active' : ''}
                onClick={() => onStageModeChange(!stageMode)}
                aria-pressed={stageMode}
              >
                <Presentation size={14} /> Presentar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
    </motion.aside>
  )
}
