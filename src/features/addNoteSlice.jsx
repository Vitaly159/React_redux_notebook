import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export const addNoteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    activeNote: "",
    valueTitle: "",
    valueBody: "",
  },
  reducers: {
    onAddNote(state, action) {
      state.notes.push({
        id: uuid(),
        title: "Имя задачи",
        body: "",
        lastChanged: Date.now(),
      });
    },
    setActiveNote(state, action) {
      state.activeNote = action.payload;
    },
    setValueTitle(state, action) {
      state.valueTitle = action.payload;
    },
    setValueBody(state, action) {
      state.valueBody = action.payload;
    },
    onDeleteNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      // state.activeNote = '';
    },
    onUpdateNote(state, action) {
      const updatedNotesArray = state.notes.map((note) => {
        if (note.id === state.activeNote) {
          return action.payload;
        }
        return note;
      });

      state.notes = updatedNotesArray;
    },
  },
});

export const {
  onAddNote,
  setActiveNote,
  onDeleteNote,
  onUpdateNote,
  setValueTitle,
  setValueBody
} = addNoteSlice.actions;
export default addNoteSlice.reducer;
