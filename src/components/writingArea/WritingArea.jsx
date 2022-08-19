import { useSelector, useDispatch } from "react-redux";
import { onUpdateNote, setValueTitle, setValueBody} from "../../features/addNoteSlice";

import "./writingArea.css";

function Main() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const valueTitle = useSelector((state) => state.notes.valueTitle);
  const valueBody = useSelector((state) => state.notes.valueBody);
  const activeNote = useSelector((state) => state.notes.activeNote);

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onEditField = (title, valueTitle, body, valueBody) => {
    dispatch(onUpdateNote({
      ...getActiveNote(),
      [title]: valueTitle,
      [body]: valueBody,
      lastChanged: Date.now(),
    }));
  };

  if (!getActiveNote())
    return <div className="center">Создайте новую запись и нажмите на нее</div>;

  return (
    <div className="main-wrapper">
      <div className="main-note-edit">
        <button
          className="saveBtn"
          onClick={() => onEditField("title", valueTitle, "body", valueBody)}
        >
          Сохранить задачу
        </button>

        <input
          type="text"
          className="title"
          value={valueTitle}
          placeholder="Введите имя задачи"
          onChange={(e) => dispatch(setValueTitle(e.target.value))}
          autoFocus
        />

        <textarea
          className="body"
          placeholder="Введите содержание..."
          value={valueBody}
          onChange={(e) => dispatch(setValueBody(e.target.value))}
        ></textarea>
      </div>

      <div className="main-note-preview">
        <h1 className="preview-title">{getActiveNote.title}</h1>
        <div className="note-preview">{getActiveNote.body}</div>
      </div>
    </div>
  );
}

export default Main;
