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

const saveToStorage = (username: string, workouts: Workout[]) => {
  localStorage.setItem(`workouts_${username}`, JSON.stringify(workouts))
}

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setWorkouts(state, action: PayloadAction<Workout[]>) {
      state.workouts = action.payload
    },

    addWorkout(
      state,
      action: PayloadAction<{ workout: Workout; username: string }>
    ) {
      state.workouts.push(action.payload.workout)
      saveToStorage(action.payload.username, state.workouts)
    },

    removeWorkout(
      state,
      action: PayloadAction<{ id: string; username: string }>
    ) {
      state.workouts = state.workouts.filter(w => w.id !== action.payload.id)
      saveToStorage(action.payload.username, state.workouts)
    },

    updateWorkout(
      state,
      action: PayloadAction<{
        id: string
        name: string
        date: string
        username: string
      }>
    ) {
      state.workouts = state.workouts.map(w =>
        w.id === action.payload.id
          ? { id: w.id, name: action.payload.name, date: action.payload.date }
          : w
      )
      saveToStorage(action.payload.username, state.workouts)
    },
  },
})

export const {
  addWorkout,
  removeWorkout,
  setWorkouts,
  updateWorkout,
} = workoutsSlice.actions

export default workoutsSlice.reducer
