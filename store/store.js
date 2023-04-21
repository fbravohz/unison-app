import { configureStore } from '@reduxjs/toolkit'
import editUserReducer from './editUserSlice'

export const store = configureStore({
  reducer: {
    editUserData: editUserReducer,
  },
})