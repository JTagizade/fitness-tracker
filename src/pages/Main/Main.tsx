import { Container, Column, Header, SignOut, CentralColumn } from './Main.styles'
import { DashboardStats, WorkoutLogForm, WorkoutSessionsList } from '../../components'
import { useLocalStorageSync } from '../../hooks'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUser } from '../../store/userSlice'
import { setWorkouts } from '../../store/workoutsSlice'
import { getWorkouts } from '../../utils/workoutStorage'
import type { RootState } from '../../store'

export const Main = () => {
  useLocalStorageSync()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state: RootState) => state.user.username)

  const [editWorkout, setEditWorkout] = useState<{
    id: string
    name: string
    date: string
  } | null>(null)

  useEffect(() => {
    if (!username) return
    const data = getWorkouts(username)
    dispatch(setWorkouts(data))
  }, [username, dispatch])

  const handleSignOut = () => {
    localStorage.removeItem('sessionUser')
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <>
      <Header>
        <SignOut onClick={handleSignOut}>Sign Out</SignOut>
      </Header>
      <Container>
        <Column>
          <WorkoutSessionsList setEditWorkout={setEditWorkout} />
        </Column>
        <CentralColumn>
          <DashboardStats />
        </CentralColumn>
        <Column>
          <WorkoutLogForm
            editWorkout={editWorkout}
            setEditWorkout={setEditWorkout}
          />
        </Column>
      </Container>
    </>
  )
}
