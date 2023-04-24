import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubModule: null,
  selectedModule: null
}

export const SelectModuleSlice = createSlice({
  name: 'selectModule',
  initialState,
  reducers: {
    setSelectedSubModule: (state, action) => {
      state.selectedSubModule = action.payload;
    },
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
  }
})

export const { setSelectedSubModule, setSelectedModule } = SelectModuleSlice.actions

export default SelectModuleSlice.reducer