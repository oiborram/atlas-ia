import { useEffect, useId, useState } from 'react'
import { WarningCircle } from '@phosphor-icons/react'

interface MermaidBlockProps {
  chart: string
}

export function MermaidBlock({ chart }: MermaidBlockProps) {
  const reactId = useId().replace(/:/g, '')
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        const isDark = document.documentElement.dataset.theme === 'dark'
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          themeVariables: {
            primaryColor: isDark ? '#18342a' : '#dff2e8',
            primaryTextColor: isDark ? '#edf5f0' : '#102119',
            primaryBorderColor: isDark ? '#4ca97c' : '#287f59',
            lineColor: isDark ? '#6f8b7d' : '#61736a',
            secondaryColor: isDark ? '#18231f' : '#f0f5f2',
            tertiaryColor: isDark ? '#101815' : '#ffffff',
            background: 'transparent',
          },
        })
        const result = await mermaid.render(`mermaid-${reactId}-${Date.now()}`, chart)
        if (active) setSvg(result.svg)
      } catch {
        if (active) setError(true)
      }
    }
    void render()
    return () => {
      active = false
    }
  }, [chart, reactId])

  if (error) {
    return (
      <div className="mermaid-error" role="alert">
        <WarningCircle size={20} /> No se pudo representar este diagrama.
      </div>
    )
  }

  if (!svg) return <div className="diagram-skeleton" aria-label="Generando diagrama" />

  return <div className="mermaid-block" dangerouslySetInnerHTML={{ __html: svg }} />
}

