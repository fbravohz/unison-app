import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import editUserReducer from './editUserSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editUserData: editUserReducer,
  },
})