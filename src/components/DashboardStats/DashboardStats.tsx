import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import type { RootState } from '../../store'
import { Container, SessionStats } from './DashboardStats.styles'
import PieChartComponent from '../PieChart/PieChartComponent'
import dateFormat from 'dateformat'
import {
  fetchExerciseImages,
  fetchExercises,
  fetchMuscles,
  type WgerExercise,
} from '../../api/wger'

interface ExerciseWithImage {
  exercise: WgerExercise
  imageUrl: string | null
}

const TAGS = ['Chest', 'Lats', 'Abs', 'Calves', 'Shoulders', 'Biceps', 'Triceps']

const getDailyTag = () => {
  const dayIndex = new Date().getDay()
  return TAGS[dayIndex % TAGS.length]
}

export const DashboardStats = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts)

  const totalWorkouts = workouts.length
  const lastWorkout = useMemo(() => {
    if (!workouts.length) return 'N/A'
    return workouts[workouts.length - 1].date
  }, [workouts])

  const [exerciseError, setExerciseError] = useState<string | null>(null)
  const [exerciseLoading, setExerciseLoading] = useState(false)
  const [dailyExercise, setDailyExercise] = useState<ExerciseWithImage | null>(null)
  const [dailyTag, setDailyTag] = useState<string>(getDailyTag())

  useEffect(() => {
    let isMounted = true
    setExerciseLoading(true)
    setExerciseError(null)

    const load = async () => {
      const musclesResp = await fetchMuscles()
      const tag = getDailyTag()
      const muscle = musclesResp.results.find(m =>
        (m.name_en ?? m.name).toLowerCase() === tag.toLowerCase()
      )
      if (!muscle) {
        throw new Error(`Muscle not found for tag: ${tag}`)
      }

      const exercisesResp = await fetchExercises({
        muscles: muscle.id,
        language: 2,
        status: 2,
        limit: 1,
      })

      const ex = exercisesResp.results[0]
      if (!ex) {
        throw new Error(`No exercises found for ${tag}`)
      }

      const baseId = ex.exercise_base ?? ex.id
      const images = await fetchExerciseImages(baseId)
      const imageUrl =
        images.length > 0
          ? images[Math.floor(Math.random() * images.length)].image
          : null

      return { exercise: ex, imageUrl, tag }
    }

    load()
      .then(result => {
        if (!isMounted) return
        setDailyTag(result.tag)
        setDailyExercise({ exercise: result.exercise, imageUrl: result.imageUrl })
      })
      .catch(err => {
        if (!isMounted) return
        setExerciseError(err instanceof Error ? err.message : 'Failed to load')
      })
      .finally(() => {
        if (!isMounted) return
        setExerciseLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container>
      <PieChartComponent />


      {exerciseLoading && <p>Loading...</p>}
      {exerciseError && <p>{exerciseError}</p>}
      {!exerciseLoading && !exerciseError && dailyExercise && (
        <div style={{ display: 'flex', justifyContent: 'space-between', height: '360px', paddingLeft: '16px', alignItems: 'center' }}>
          <h3>Today’s recommended exercise ({dailyTag})</h3>
          <p>
            {dailyExercise.exercise.translations?.[1]?.name ?? 'No name'}
          </p>
          {dailyExercise.imageUrl ? (
            <div style={{ border: '1px solid #383838', borderRadius: '4px' }}>
              <img
                src={dailyExercise.imageUrl}
                height="350px"
                alt={dailyExercise.exercise.translations?.[1]?.name ?? 'Exercise'}
                />
            </div>
          ) : (
            <div>No image</div>
          )}
        </div>
      )}


      <SessionStats>
        <p>Total Workouts: {totalWorkouts}</p>
        <p>Last Workout: {dateFormat(lastWorkout, "dd - mmmm")}</p>
      </SessionStats>

    </Container>
  )
}
