import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatedData: {
    fullname: undefined,
    username: undefined,
    password: undefined,
    hireDate: undefined,
    id_company: undefined,
    id_position: undefined,
    id_userProfile: undefined,
    id_userState: undefined,
  },
  isEditData: false,
  userData: undefined,
  isDataUpdated: false,
  isCreateUser: false
}

export const EditUserSlice = createSlice({
  name: 'editUser',
  initialState,
  reducers: {
    updateFullname: (state, action) => {
      state.updatedData.fullname = action.payload;
      // if(state.updatedData.fullname === '')
      //   state.updatedData.fullname = undefined;
    },
    updateUsername: (state, action) => {
      state.updatedData.username = action.payload;
      // if(state.updatedData.username === '')
      //   state.updatedData.username = undefined;
    },
    updatePassword: (state, action) => {
      state.updatedData.password = action.payload;
      // if(state.updatedData.password === '')
      //   state.updatedData.password = undefined;
    },
    updateHireDate: (state, action) => {
      state.updatedData.hireDate = action.payload;
    },
    updateCompany: (state, action) => {
      state.updatedData.id_company = action.payload;
    },
    updatePosition: (state, action) => {
      state.updatedData.id_position = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.updatedData.id_userProfile = action.payload;
    },
    updateUserState: (state, action) => {
      state.updatedData.id_userState = action.payload;
    },
    setIsEditData: (state, action) => {
      state.isEditData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsDataUpdated: (state, action) => {
      state.isDataUpdated = action.payload;
    },
    setIsCreateUser: (state, action) => {
      state.isCreateUser = action.payload;
    },
    restoreChanges: (state) => {
      state.updatedData.fullname = undefined;
      state.updatedData.username = undefined;
      state.updatedData.password = undefined;
      state.updatedData.hireDate = undefined;
      state.updatedData.id_company = undefined;
      state.updatedData.id_position = undefined;
      state.updatedData.id_userProfile = undefined;
      state.updatedData.id_userState = undefined;
    },
    restoreAll: (state) => {
      state.updatedData.fullname = undefined;
      state.updatedData.username = undefined;
      state.updatedData.password = undefined;
      state.updatedData.hireDate = undefined;
      state.updatedData.id_company = undefined;
      state.updatedData.id_position = undefined;
      state.updatedData.id_userProfile = undefined;
      state.updatedData.id_userState = undefined;
      state.isEditData = false;
      state.userData = undefined;
      state.isDataUpdated = false;
      state.isCreateUser = false;
    },
  }
})

export const {
updateUsername,
updateFullname,
updatePassword,
updateHireDate,
updateCompany,
updatePosition,
updateUserProfile,
updateUserState,
restoreAll,
restoreChanges,
setIsEditData,
setUserData,
setIsDataUpdated,
setIsCreateUser } = EditUserSlice.actions

export default EditUserSlice.reducer