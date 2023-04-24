import { configureStore } from '@reduxjs/toolkit'
import editUserReducer from './editUserSlice'
import selectModuleReducer from './selectModuleSlice';

export const store = configureStore({
  reducer: {
    editUserData: editUserReducer,
    selectModule: selectModuleReducer,
  },
})