import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { removeWorkout } from '../../store/workoutsSlice'

interface WorkoutSessionsListProps {
  setEditWorkout: (workout: { id: string; name: string; date: string }) => void
}

export const WorkoutSessionsList = ({ setEditWorkout }: WorkoutSessionsListProps) => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts)    
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
              <button onClick={() => dispatch(removeWorkout(w.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
