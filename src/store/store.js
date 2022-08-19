import { configureStore } from '@reduxjs/toolkit';
import addNoteReducer from '../features/addNoteSlice';

export const store = configureStore({
  reducer: {
    notes: addNoteReducer,
  },
})