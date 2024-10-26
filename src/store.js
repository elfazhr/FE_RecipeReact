import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/actions/authLayouts';

const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  
  export default store