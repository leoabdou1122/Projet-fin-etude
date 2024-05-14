import { combineReducers } from 'redux';
import dataReducer from './slices/userSlices';
import authReducer from './slices/userAuthSlice';
import adminAuth from './slices/AdminAuthSlice';
import adminData from './slices/AdminSlice'
const rootReducer = combineReducers({
  userData : dataReducer,
  userAuth : authReducer,
  adminAuth : adminAuth,
  adminData : adminData
});

export default rootReducer;