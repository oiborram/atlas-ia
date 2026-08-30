export interface AudioSummary {
  categoryId: string
  title: string
  src: string
}

const titles: Record<string, string> = {
  '00-guia': 'Guía del Atlas de IA',
  '01-era-alphago': 'La era AlphaGo',
  '02-era-transformer': 'La era Transformer',
  '03-era-chatgpt': 'La era ChatGPT',
  '04-era-ia-local': 'La era de la IA local',
  '05-era-thinking': 'La era Thinking',
  '06-era-agent-tools': 'Era Agent Tools',
  '07-era-mcp': 'Era MCP',
  '08-era-agentes-autonomos': 'Era de los agentes autónomos',
  '09-impacto-y-productos': 'Impacto y productos',
  '10-laboratorios': 'Laboratorios',
  '11-casos-y-experimentos': 'Casos y experimentos',
  '12-codex': 'Codex a fondo',
  '13-prompting-loop-graph-engineering': 'Prompting, loops y grafos',
  '14-ampliacion-avanzada': 'Ampliación avanzada',
  '15-legal': 'Legal y gobernanza',
  '16-panorama-actual': 'Panorama actual',
  referencias: 'Referencias',
}

export function getAudioSummary(categoryId: string): AudioSummary | undefined {
  const title = titles[categoryId]
  if (!title) return undefined

  return {
    categoryId,
    title,
    src: `${import.meta.env.BASE_URL}audio/atlas-${categoryId}.wav`,
  }
}

export function getDocumentAudioSummary(categoryId: string, path: string): AudioSummary | undefined {
  return path.endsWith('/00-resumen.md') ? getAudioSummary(categoryId) : undefined
}
