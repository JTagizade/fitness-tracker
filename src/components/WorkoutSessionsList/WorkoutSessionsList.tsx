import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { removeWorkout } from '../../store/workoutsSlice'
import dateFormat from 'dateformat';
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { FormattedSessionDate, ListHeader, ListLabel, MuscleGroup, NoSessionGif, SessionActions, SessionDate, SessionName, SessionOrder, SessionsList, SessionsListUl, WorkoutSession } from './WorkoutSessionsList.styles'
import { useEffect, useRef } from 'react';

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

  const sessionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (sessionsListRef.current) {
      sessionsListRef.current.scrollTo({
        top: sessionsListRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [workouts])
  
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
        <NoSessionGif>
          <p>Bruuuh, hit the gym</p>
          <img src="https://www.basic-fit.com/on/demandware.static/-/Library-Sites-basic-fit-shared-library/default/dwc811438f/Blogs/GIFs%20for%20biceps/StraightbarcurlEDITED-ezgif.com-optimize.gif" alt="No workouts" />
        </NoSessionGif>
      ) : (
        <SessionsListUl ref={sessionsListRef}>
          {workouts.map(w => (
            <WorkoutSession key={w.id}>
              <SessionOrder>{workouts.indexOf(w) + 1}</SessionOrder>
              <FormattedSessionDate>{dateFormat(w.date, "dd - mmmm")}</FormattedSessionDate>
              <MuscleGroup>
                <SessionName title={w.name}>{w.name}</SessionName>
                <SessionActions>
                  <GrEdit onClick={() => setEditWorkout(w)}/>
                  <RiDeleteBinLine onClick={() => {
                      if (!username) return
                      dispatch(removeWorkout({ id: w.id, username }))
                    }}
                  />              
                </SessionActions>
              </MuscleGroup>
            </WorkoutSession>
          ))}
        </SessionsListUl>
      )}
    </SessionsList>
  )
}
