import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { removeWorkout } from '../../store/workoutsSlice'
import dateFormat from 'dateformat';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";


import { FormattedSessionDate, ListHeader, ListLabel, MuscleGroup, SessionDate, SessionOrder, SessionsList, SessionsListUl, WorkoutSession } from './WorkoutSessionsList.styles'

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
    <SessionsList>
      <ListLabel>
        <h2>Workout Sessions</h2>
      </ListLabel>
      <ListHeader>
        <SessionOrder>No.</SessionOrder>     
        <SessionDate>Date</SessionDate>
        <MuscleGroup>Muscle Group</MuscleGroup>       
      </ListHeader>
      {workouts.length === 0 ? (
        <p>Bruuuh, hit the gym</p>
      ) : (
        <SessionsListUl>
          {workouts.map(w => (
            <WorkoutSession key={w.id}>
              <SessionOrder>{workouts.indexOf(w) + 1}</SessionOrder>
              <FormattedSessionDate>{dateFormat(w.date, "dd - mmmm")}</FormattedSessionDate>
              <MuscleGroup>
                {w.name}

                <GrEdit onClick={() => setEditWorkout(w)}/>
                <RiDeleteBinLine onClick={() => {
                    if (!username) return
                    dispatch(removeWorkout({ id: w.id, username }))
                  }}
                />
              </MuscleGroup>
             

            </WorkoutSession>
          ))}
        </SessionsListUl>
      )}
    </SessionsList>
  )
}
