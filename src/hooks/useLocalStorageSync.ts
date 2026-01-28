import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { setWorkouts } from '../store/workoutsSlice'
import { useEffect } from 'react'

export const useLocalStorageSync = () => {
  const dispatch = useDispatch()
  const username = useSelector((state: RootState) => state.user.username)

  useEffect(() => {
    if (!username) {
      dispatch(setWorkouts([]))
      return
    }

    const stored = localStorage.getItem(`workouts_${username}`)
    dispatch(setWorkouts(stored ? JSON.parse(stored) : []))
  }, [username, dispatch])
}
