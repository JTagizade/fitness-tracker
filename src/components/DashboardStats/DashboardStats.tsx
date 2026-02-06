import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import type { RootState } from '../../store'
import { Container, ExerciseInfo, ExerciseName, SessionStats } from './DashboardStats.styles'
import PieChartComponent from '../PieChart/PieChartComponent'
import dateFormat from 'dateformat'
import {
  fetchExerciseImages,
  fetchExercises,
  fetchExerciseVideos,
  fetchMuscles,
  type WgerExercise,
} from '../../api/wger'

interface ExerciseWithImage {
  exercise: WgerExercise
  imageUrl: string | null
  videoUrl: string | null
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
    if (!workouts.length) return null
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
        limit: 20,
      })

      if (!exercisesResp.results.length) {
        throw new Error(`No exercises found for ${tag}`)
      }

      let selectedExercise = exercisesResp.results[0]
      let selectedVideos: { video: string | null }[] = []

      for (const candidate of exercisesResp.results) {
        const vids = await fetchExerciseVideos(candidate.id).catch(() => [])
        if (vids.length > 0) {
          selectedExercise = candidate
          selectedVideos = vids
          break
        }
      }

      const baseId = selectedExercise.exercise_base ?? selectedExercise.id
      const images = await fetchExerciseImages(baseId)
      const imageUrl =
        images.length > 0
          ? images[Math.floor(Math.random() * images.length)].image
          : null
      const videoUrl =
        selectedVideos.length > 0 ? selectedVideos[0].video ?? null : null

      return { exercise: selectedExercise, imageUrl, videoUrl, tag }
    }

    load()
      .then(result => {
        if (!isMounted) return
        setDailyTag(result.tag)
        setDailyExercise({
          exercise: result.exercise,
          imageUrl: result.imageUrl,
          videoUrl: result.videoUrl,
        })
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

      <ExerciseInfo>

        {exerciseLoading && <p>Loading...</p>}
        {exerciseError && <p>{exerciseError}</p>}
        {!exerciseLoading && !exerciseError && dailyExercise && (
          <ExerciseName>
            <h3>Today’s recommended exercise ({dailyTag})</h3>
            <p>
              {dailyExercise.exercise.translations?.[1]?.name ?? 'No name'}
            </p>

            {dailyExercise.videoUrl ? (
              <a href={dailyExercise.videoUrl} target="_blank" rel="noreferrer">
                Watch video
              </a>
            ) : (
              <div>No video</div>
            )}
          </ExerciseName>
          )}

        {!exerciseLoading && !exerciseError && dailyExercise && (
            <>
              {dailyExercise.imageUrl ? (
                <img
                  src={dailyExercise.imageUrl}
                  height="350"
                  alt={dailyExercise.exercise.translations?.[1]?.name ?? 'Exercise'}
                />
              ) : (
                <div>No image</div>
              )}
            </>
          )}


          </ExerciseInfo>
                    

      <SessionStats>
        <p>Total Workouts: {totalWorkouts}</p>
        <p>Last Workout: {lastWorkout ? dateFormat(lastWorkout, "dd - mmmm") : "N/A"}</p>
      </SessionStats>

    </Container>
  )
}
