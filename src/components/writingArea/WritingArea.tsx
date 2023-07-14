import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { onUpdateNote, setValueTitle, setValueBody } from "../../features/addNoteSlice";
import "./writingArea.css";

function Main() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  const valueTitle = useAppSelector((state) => state.notes.valueTitle);
  const valueBody = useAppSelector((state) => state.notes.valueBody);
  const activeNote = useAppSelector((state) => state.notes.activeNote);
  const getActiveNote: any = () => notes?.find((note) => note.id === activeNote);

  const onEditField = (
    title: string,
    valueTitle: string,
    body: string,
    valueBody: string
  ): void => {
    dispatch(
      onUpdateNote({
        ...getActiveNote(),
        [title]: valueTitle,
        [body]: valueBody,
        lastChanged: Date.now(),
      })
    );
  };
  console.log(notes);

  if (!getActiveNote()) return <div className="center">Создайте новую запись и нажмите на нее</div>;

  return (
    <div className="main-wrapper">
      <div className="main-note-edit">
        <button
          aria-label="save"
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
