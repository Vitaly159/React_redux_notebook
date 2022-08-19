import { useDispatch } from "react-redux";
import { onAddNote } from "../../../features/addNoteSlice";
import "./notesHeader.css";

function NotesHeader({ searching }) {
  const dispatch = useDispatch();
  
  return (
    <div>
      <div className="notes-header">
        <h1>Записи</h1>
        <button className="add-note" onClick={()=>dispatch(onAddNote())}>
          Новая запись
        </button>
      </div>
      <div>
        <input
          className="searching"
          onChange={searching}
          placeholder="Поиск по записям"
        />
      </div>
    </div>
  );
}

export default NotesHeader;
