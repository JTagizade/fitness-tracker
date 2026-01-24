import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Workout {
  id: string
  name: string
  date: string
}

interface WorkoutsState {
  workouts: Workout[]
}

const initialState: WorkoutsState = {
  workouts: [],
}

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addWorkout(state, action: PayloadAction<Workout>) {
      state.workouts.push(action.payload)
    },
    removeWorkout(state, action: PayloadAction<string>) {
      state.workouts = state.workouts.filter(w => w.id !== action.payload)
    },
    setWorkouts(state, action: PayloadAction<Workout[]>) {
      state.workouts = action.payload
    },
  },
})

export const { addWorkout, removeWorkout, setWorkouts } = workoutsSlice.actions
export default workoutsSlice.reducer
