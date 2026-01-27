import { configureStore } from '@reduxjs/toolkit'
import workoutsReducer from './workoutsSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
