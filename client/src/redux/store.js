import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


const initialuser = {
  value: {
    username: "",
    email: "",
    phone: "",
    accessToken: ""
  },
};

const initialadmin = {
  value: {
    username: "",
    accessToken: ""
  },
};

const userSlice = createSlice({
  name: "user",
  initialState:initialuser,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value=initialuser.value
    },
    editdata: (state,action) => {
      state.value.accessToken=action.payload
    }
  },
});


const adminSlice = createSlice({
  name: "admin",
  initialState:initialadmin,
  reducers: {
    adminlogin: (state, action) => {
      state.value = action.payload;
    },
    adminlogout: (state) => {
      state.value=initialadmin.value
    },
  },
});



const presistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userSlice.reducer,
  admin:adminSlice.reducer
})


const persistedReducer=persistReducer(presistConfig,reducer)

export const { login, logout,editdata } = userSlice.actions

export const{adminlogin,adminlogout}=adminSlice.actions

export const store = configureStore({
    reducer:persistedReducer
});

