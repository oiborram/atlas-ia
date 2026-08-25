import { describe, expect, it } from 'vitest'
import {
  categories,
  documents,
  extractHeadings,
  homeDocument,
  resolveDocumentPath,
  toPlainText,
} from './content'

describe('course content index', () => {
  it('indexes the complete course and its legal section', () => {
    expect(documents.length).toBeGreaterThanOrEqual(90)
    expect(categories.find((category) => category.id === '15-legal')?.documents).toHaveLength(10)
    expect(homeDocument.path).toBe('README.md')
  })

  it('keeps document paths unique', () => {
    const paths = documents.map((document) => document.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('extracts stable, unique heading anchors', () => {
    const headings = extractHeadings('## Concepto\n### Detalle\n## Concepto')
    expect(headings.map((heading) => heading.id)).toEqual(['concepto', 'detalle', 'concepto-1'])
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

