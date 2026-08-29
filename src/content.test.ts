import { describe, expect, it } from 'vitest'
import {
  categories,
  documents,
  extractHeadings,
  extractTitle,
  homeDocument,
  resolveDocumentPath,
  toPlainText,
} from './content'

describe('course content index', () => {
  it('indexes the complete course and its legal section', () => {
    expect(documents.length).toBeGreaterThanOrEqual(118)
    expect(categories.find((category) => category.id === '04-era-ia-local')?.documents).toHaveLength(7)
    expect(categories.find((category) => category.id === '15-legal')?.documents).toHaveLength(11)
    expect(categories.find((category) => category.id === '16-panorama-actual')?.documents).toHaveLength(5)
    expect(homeDocument.path).toBe('README.md')
  })

  it('opens every expandable category with its summary', () => {
    const expandableCategories = categories.filter((category) => category.id !== 'root')

    expect(expandableCategories).toHaveLength(18)
    for (const category of expandableCategories) {
      expect(category.documents[0]?.path).toBe(`${category.id}/00-resumen.md`)
    }
  })

  it('keeps document paths unique', () => {
    const paths = documents.map((document) => document.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('extracts stable, unique heading anchors', () => {
    const headings = extractHeadings('## Concepto\n### Detalle\n## Concepto')
    expect(headings.map((heading) => heading.id)).toEqual(['concepto', 'detalle', 'concepto-1'])
  })

  it('extracts titles and headings from Windows CRLF markdown', () => {
    const markdown = '# Lección\r\n\r\n## Tokenización\r\n\r\nTexto.\r\n## Embeddings\r\n'

    expect(extractTitle(markdown, 'fallback')).toBe('Lección')
    expect(extractHeadings(markdown)).toEqual([
      { depth: 2, text: 'Tokenización', id: 'tokenización' },
      { depth: 2, text: 'Embeddings', id: 'embeddings' },
    ])
  })

  it('indexes the principal headings of the tokenization lesson', () => {
    const document = documents.find((candidate) => candidate.path === '02-era-transformer/01-tokens-embeddings-y-contexto.md')

    expect(document?.headings.filter((heading) => heading.depth === 2).map((heading) => heading.text)).toEqual([
      'Tokenización',
      'Embeddings',
      'Ventana de contexto',
      'Embedding no es base de datos vectorial',
    ])
  })

  it('resolves relative markdown links within the course tree', () => {
    expect(resolveDocumentPath('00-guia/01-como-usar-el-curso.md', '../15-legal/README.md'))
      .toEqual({ path: '15-legal/README.md', anchor: undefined })
    expect(resolveDocumentPath('README.md', 'no-existe.md')).toBeNull()
  })

  it('indexes context caching and compaction in their lessons and page outlines', () => {
    const sections = [
      ['04-era-ia-local/03-inferencia-flashattention-y-kv-cache.md', 'Context cache: caché de contexto entre peticiones'],
      ['06-era-agent-tools/02-memoria-planificacion-y-fiabilidad.md', 'Compactadores de contexto'],
      ['13-prompting-loop-graph-engineering/02-contexto-evidencia-y-estructura.md', 'Práctica: caché y compactación en un bucle'],
    ]

    for (const [path, title] of sections) {
      const document = documents.find((candidate) => candidate.path === path)
      const heading = document?.headings.find((candidate) => candidate.text === title)

      expect(heading?.depth).toBe(2)
      expect(toPlainText(document?.content || '')).toContain(title)
      expect(resolveDocumentPath('README.md', `${path}#${heading?.id}`))
        .toEqual({ path, anchor: heading?.id })
    }
  })

  it('turns markdown into searchable text', () => {
    expect(toPlainText('# Título\nUn [enlace](https://example.com) y `código`.')).toContain('Título Un enlace y código')
  })

  it('indexes the reasoning technique family in the Thinking era', () => {
    const path = '05-era-thinking/01-de-chain-of-thought-a-reasoning-models.md'
    const document = documents.find((candidate) => candidate.path === path)
    const expectedHeadings = [
      'Zero-Shot, One-Shot y Few-Shot',
      'Chain-of-Thought: una ruta lineal de pasos',
      'De una cadena a varias rutas',
      'Tree of Thoughts: explorar, puntuar y retroceder',
      'Graph of Thoughts: combinar y reutilizar ramas',
      'Program of Thoughts, PAL y ReAct: sacar trabajo fuera del texto',
      'Qué técnica elegir',
    ]

    expect(document?.categoryId).toBe('05-era-thinking')
    expect(document?.headings.filter((heading) => expectedHeadings.includes(heading.text)).map((heading) => heading.text))
      .toEqual(expectedHeadings)
    expect(toPlainText(document?.content || '')).toContain('Self Consistency')
    expect(resolveDocumentPath('README.md', `${path}#tree-of-thoughts-explorar-puntuar-y-retroceder`))
      .toEqual({ path, anchor: 'tree-of-thoughts-explorar-puntuar-y-retroceder' })
  })

  it.each([
    ['03-era-chatgpt/05-sicofancia-de-modelos.md', '03-era-chatgpt', 'Sicofancia', 'Cómo apareció en la investigación'],
    ['06-era-agent-tools/05-evolucion-del-modo-plan.md', '06-era-agent-tools', 'modo plan', 'Una evolución, no una invención aislada'],
  ])('indexes the new lesson %s in its era and outline', (path, categoryId, term, headingTitle) => {
    const document = documents.find((candidate) => candidate.path === path)
    const heading = document?.headings.find((candidate) => candidate.text === headingTitle)

    expect(document?.categoryId).toBe(categoryId)
    expect(toPlainText(document?.content || '')).toContain(term)
    expect(heading?.depth).toBe(2)
    expect(resolveDocumentPath('README.md', `${path}#${heading?.id}`))
      .toEqual({ path, anchor: heading?.id })
  })
})
