import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { removeWorkout } from '../../store/workoutsSlice'

interface Workout {
  id: string
  name: string
  date: string
}

interface WorkoutSessionsListProps {
  setEditWorkout: (workout: Workout) => void
}

export const WorkoutSessionsList = ({ setEditWorkout }: WorkoutSessionsListProps) => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts)
  const username = useSelector((state: RootState) => state.user.username)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Workout Sessions</h2>
      {workouts.length === 0 ? (
        <p>Bruuuh, hit the gym</p>
      ) : (
        <ul>
          {workouts.map(w => (
            <li key={w.id}>
              {w.name} - {w.date}
              <button
                onClick={() => setEditWorkout(w)}
                style={{ marginLeft: '6px' }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (!username) return
                  dispatch(removeWorkout({ id: w.id, username }))
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
