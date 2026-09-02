import { describe, expect, it } from 'vitest'
import { courseDocumentHash, courseHomeHash, libraryHash, parseCourseRoute } from './courseRouting'

describe('course routing', () => {
  it('opens the library for an empty or unknown hash', () => {
    expect(parseCourseRoute('')).toEqual({ kind: 'library' })
    expect(parseCourseRoute('#/unknown')).toEqual({ kind: 'library' })
  })

  it('parses a course and its document', () => {
    expect(parseCourseRoute('#/course/ai-atlas/doc/00-guia%2F00-resumen.md?anchor=inicio')).toEqual({
      kind: 'course',
      courseId: 'ai-atlas',
      documentPath: '00-guia/00-resumen.md',
      anchor: 'inicio',
      legacy: false,
    })
  })

  it('keeps old Atlas links working', () => {
    expect(parseCourseRoute('#/doc/README.md')).toEqual({
      kind: 'course',
      courseId: 'ai-atlas',
      documentPath: 'README.md',
      anchor: undefined,
      legacy: true,
    })
  })

  it('builds canonical hashes', () => {
    expect(courseHomeHash('ai-atlas')).toBe('#/course/ai-atlas')
    expect(courseDocumentHash('ai-atlas', '00-guia/00-resumen.md', 'qué-es')).toBe(
      '#/course/ai-atlas/doc/00-guia%2F00-resumen.md?anchor=qu%C3%A9-es',
    )
    expect(libraryHash).toBe('#/courses')
  })
})
