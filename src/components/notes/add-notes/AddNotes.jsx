import { useSelector, useDispatch } from "react-redux";
import { setActiveNote, onDeleteNote, setValueBody, setValueTitle } from "../../../features/addNoteSlice";
import "./addNotes.css";

function AddNotes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const activeNote = useSelector((state) => state.notes.activeNote);
  const searchValue = useSelector((state) => state.notes.searchValue);

  const filteredNotes = notes.filter(
    (note) =>
      note.body.toLowerCase().includes(searchValue.toLowerCase()) ||
      note.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return filteredNotes.map((note, index) => (
    <div
      key={index}
      className={`added-note ${note.id === activeNote && "active"}`}
      onClick={() => {
        dispatch(setActiveNote(note.id));
        dispatch(setValueTitle(note.title));
        dispatch(setValueBody(note.body));
      }}
    >
      <div className="added-note-title">
        <strong>{note.title}</strong>
        <button className="del" onClick={() => dispatch(onDeleteNote(note.id))}>
          Удалить
        </button>
      </div>

      <p className="added-note-preview">
        {note.body && note.body.substr(0, 30) + "..."}
      </p>
      <small className="note-meta">
        Последнее изменение{" "}
        {new Date(note.lastChanged).toLocaleDateString("ru", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    </div>
  ));
}

export default AddNotes;
