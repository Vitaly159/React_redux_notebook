import { useDispatch } from "react-redux";
import { onAddNote, setSearchValue } from "../../../features/addNoteSlice";
import "./notesHeader.css";

const NotesHeader: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="notes-header">
        <h1>Записи</h1>
        <button className="add-note" role="save-button" onClick={() => dispatch(onAddNote(""))}>
          Новая запись
        </button>
      </div>
      <div>
        <input
          role="input"
          className="searching"
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          placeholder="Поиск по записям"
        />
      </div>
    </div>
  );
};

export default NotesHeader;
