import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/actions/authLayouts';
import recipeReducer from './redux/actions/recipeSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      recipe: recipeReducer,
    },
  });
  
  export default store