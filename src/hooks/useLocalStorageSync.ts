import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { setWorkouts } from '../store/workoutsSlice'
import { useEffect } from 'react'

export const useLocalStorageSync = () => {
  const dispatch = useDispatch()
  const workouts = useSelector((state: RootState) => state.workouts.workouts)
  const username = useSelector((state: RootState) => state.user.username)

  useEffect(() => {
    if (!username) return
    const allWorkouts = JSON.parse(localStorage.getItem('workouts') || '{}')
    dispatch(setWorkouts(allWorkouts[username] || []))
  }, [username, dispatch])

  useEffect(() => {
    if (!username) return
    const allWorkouts = JSON.parse(localStorage.getItem('workouts') || '{}')
    allWorkouts[username] = workouts
    localStorage.setItem('workouts', JSON.stringify(allWorkouts))
  }, [username, workouts])
}
