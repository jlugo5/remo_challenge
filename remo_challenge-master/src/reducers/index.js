

import { combineReducers } from "redux";
import data from "./gameDataReducer";

import userReducer from "./user.reducer";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key:'root',
  storage: storage,
  whitelist: ['user','seats']
}

export default persistReducer(persistConfig, combineReducers({
    data,
    user: userReducer
  })
)