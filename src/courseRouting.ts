export type CourseRoute =
  | { kind: 'library' }
  | { kind: 'course'; courseId: string; documentPath?: string; anchor?: string; legacy: boolean }

const AI_ATLAS_ID = 'ai-atlas'

function decode(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    return decodeURIComponent(value)
  } catch {
    return undefined
  }
}

export function parseCourseRoute(hash: string): CourseRoute {
  const legacyMatch = hash.match(/^#\/doc\/([^?]+)/)
  if (legacyMatch) {
    const params = new URLSearchParams(hash.split('?')[1] || '')
    return {
      kind: 'course',
      courseId: AI_ATLAS_ID,
      documentPath: decode(legacyMatch[1]),
      anchor: params.get('anchor') || undefined,
      legacy: true,
    }
  }

  const courseMatch = hash.match(/^#\/course\/([^/?]+)(?:\/doc\/([^?]+))?/)
  if (courseMatch) {
    const params = new URLSearchParams(hash.split('?')[1] || '')
    return {
      kind: 'course',
      courseId: decode(courseMatch[1]) || '',
      documentPath: decode(courseMatch[2]),
      anchor: params.get('anchor') || undefined,
      legacy: false,
    }
  }

  return { kind: 'library' }
}

export function courseHomeHash(courseId: string): string {
  return `#/course/${encodeURIComponent(courseId)}`
}

export function courseDocumentHash(courseId: string, path: string, anchor?: string): string {
  return `${courseHomeHash(courseId)}/doc/${encodeURIComponent(path)}${anchor ? `?anchor=${encodeURIComponent(anchor)}` : ''}`
}

export const libraryHash = '#/courses'
