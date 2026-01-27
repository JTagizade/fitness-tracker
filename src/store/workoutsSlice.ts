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
    updateWorkout(state, action: PayloadAction<{ id: string; name: string; date: string }>) {
      state.workouts = state.workouts.map(w =>
        w.id === action.payload.id ? { ...w, ...action.payload } : w
      )
    },
  },
})

export const { addWorkout, removeWorkout, setWorkouts, updateWorkout } = workoutsSlice.actions
export default workoutsSlice.reducer
