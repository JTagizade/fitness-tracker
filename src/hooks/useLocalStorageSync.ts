import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { setWorkouts } from '../store/workoutsSlice'

export const useLocalStorageSync = () => {
  const workouts = useSelector((state: RootState) => state.workouts.workouts)
  const dispatch = useDispatch()

  useEffect(() => {
    const saved = localStorage.getItem('workouts')
    if (saved) {
        dispatch(setWorkouts(JSON.parse(saved)))
    }
  }, [])

  useEffect(() => {
    if (workouts.length) {
      localStorage.setItem('workouts', JSON.stringify(workouts))
    }
  }, [workouts])
}
