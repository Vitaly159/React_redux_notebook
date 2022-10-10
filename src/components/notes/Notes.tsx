import AddNotes from "./add-notes/AddNotes";
import NotesHeader from "./notes-header/NotesHeader";

import "./notes.css";

function Notes() {

  return (
    <div className="notes-wrapper">
      <NotesHeader />
      <AddNotes />
    </div>
  );
}

export default Notes;
