import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../store/paginationSlice';
import searchboxReducer from "./../store/searchboxSlice";

export default configureStore({
  reducer: {
    products:paginationReducer,
    search:searchboxReducer
  },
})