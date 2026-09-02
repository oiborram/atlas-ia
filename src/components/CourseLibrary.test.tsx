import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CourseLibrary } from './CourseLibrary'
import { courses } from '../courses/catalog'

describe('CourseLibrary', () => {
  it('shows the available courses and opens the selected one', () => {
    const onOpenCourse = vi.fn()
    render(<CourseLibrary courses={courses} onOpenCourse={onOpenCourse} />)

    expect(screen.getByRole('heading', { name: /elige qué quieres/i })).toBeInTheDocument()
    expect(screen.getByText('AI Atlas')).toBeInTheDocument()
    screen.getByRole('button', { name: /ai atlas/i }).click()
    expect(onOpenCourse).toHaveBeenCalledWith('ai-atlas')
  })
})
