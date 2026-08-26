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
    expect(documents.length).toBeGreaterThanOrEqual(115)
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

  it('turns markdown into searchable text', () => {
    expect(toPlainText('# Título\nUn [enlace](https://example.com) y `código`.')).toContain('Título Un enlace y código')
  })
})
