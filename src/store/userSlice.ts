import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserState {
  username: string | null
}

const initialState: UserState = {
  username: JSON.parse(localStorage.getItem('user') || 'null')?.username || null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string }>) {
      state.username = action.payload.username
      localStorage.setItem('user', JSON.stringify({ username: action.payload.username }))
    },
    clearUser(state) {
      state.username = null
      // localStorage.removeItem('user')
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
