import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";

type NoteType = {
  id: string;
  title: string;
  body: string;
  lastChanged: Object;
};

type States = {
  notes: NoteType[];
  activeNote: string;
  valueTitle: string;
  valueBody: string;
  searchValue: string;
};

const initialState: States = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes")!)
    : [],
  activeNote: "",
  valueTitle: "",
  valueBody: "",
  searchValue: "",
};

export const addNoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    onAddNote(state, action: PayloadAction<string>) {
      state.notes.push({
        id: uuid(),
        title: "Имя задачи",
        body: "",
        lastChanged: Date.now(),
      });
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    setActiveNote(state, action: PayloadAction<string>) {
      state.activeNote = action.payload;
    },
    setValueTitle(state, action: PayloadAction<string>) {
      state.valueTitle = action.payload;
    },
    setValueBody(state, action: PayloadAction<string>) {
      state.valueBody = action.payload;
    },
    onDeleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter(
        (note: NoteType) => note.id !== action.payload
      );
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    onUpdateNote(state, action: PayloadAction<string>) {
      const updatedNotesArray: any = state.notes.map((note: any) => {
        if (note.id === state.activeNote) {
          return action.payload;
        }

        return note;
      });

      state.notes = updatedNotesArray;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  onAddNote,
  setActiveNote,
  onDeleteNote,
  onUpdateNote,
  setValueTitle,
  setValueBody,
  setSearchValue,
} = addNoteSlice.actions;
export default addNoteSlice.reducer;
