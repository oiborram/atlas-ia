import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { CourseDocument } from '../content'
import { TableOfContents } from './TableOfContents'

const document: CourseDocument = {
  id: 'demo.md',
  path: 'demo.md',
  title: 'Documento de prueba',
  description: 'Descripción',
  content: '# Documento de prueba',
  categoryId: 'root',
  categoryLabel: 'Inicio',
  index: 0,
  readingMinutes: 7,
  headings: [
    { depth: 2, text: 'Primer apartado', id: 'primer-apartado' },
    { depth: 3, text: 'Detalle secundario', id: 'detalle-secundario' },
    { depth: 2, text: 'Segundo apartado', id: 'segundo-apartado' },
  ],
}

describe('TableOfContents', () => {
  it('shows reading time and only the main markdown sections', () => {
    render(<TableOfContents document={document} activeId="primer-apartado" />)

    expect(screen.getByText('7 min')).toBeInTheDocument()
    expect(screen.getByText('2 apartados')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Primer apartado/ })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('link', { name: /Segundo apartado/ })).toBeInTheDocument()
    expect(screen.queryByText('Detalle secundario')).not.toBeInTheDocument()
  })
})
