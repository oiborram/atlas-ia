import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { BookOpenText } from '@phosphor-icons/react'
import { CourseLibrary } from './components/CourseLibrary'
import { courses, getCourse } from './courses/catalog'
import { courseHomeHash, libraryHash, parseCourseRoute } from './courseRouting'

function App() {
  const [route, setRoute] = useState(() => parseCourseRoute(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parseCourseRoute(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const course = useMemo(
    () => route.kind === 'course' ? getCourse(route.courseId) : undefined,
    [route],
  )

  const openCourse = useCallback((courseId: string) => {
    window.location.hash = courseHomeHash(courseId)
  }, [])

  const exitCourse = useCallback(() => {
    window.location.hash = libraryHash
  }, [])

  if (!course) {
    return <CourseLibrary courses={courses} onOpenCourse={openCourse} />
  }

  const CourseApp = course.App
  return (
    <Suspense fallback={
      <div className="course-loading" role="status">
        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}>
          <BookOpenText size={22} />
        </motion.span>
        <strong>Preparando {course.title}</strong>
      </div>
    }>
      <CourseApp onExitCourse={exitCourse} />
    </Suspense>
  )
}

export default App
