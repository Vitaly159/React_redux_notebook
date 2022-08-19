import { useState } from "react";
import AddNotes from "./add-notes/AddNotes";
import NotesHeader from "./notes-header/NotesHeader";

import "./notes.css";

function Notes() {
  const [searchValue, setSearchValue] = useState("");

  const Searching = function (event) {
    setSearchValue(event.target.value);
  };

  return (
    <div className="notes-wrapper">
      <NotesHeader searching={Searching} />
      <AddNotes searchValue={searchValue} />
    </div>
  );
}

export default Notes;
