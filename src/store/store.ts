import { configureStore } from '@reduxjs/toolkit';
import addNoteReducer from '../features/addNoteSlice';

export const store = configureStore({
  reducer: {
    notes: addNoteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;