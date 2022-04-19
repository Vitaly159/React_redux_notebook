import './notesHeader.css';

function NotesHeader({onAddNote, searching}){

    return(
        <div>
            <div className="notes-header">
                <h1>Записи</h1>
                <button className="add-note" onClick={onAddNote}>Новая запись</button>
            </div>
            <div>
                <input className="searching" onChange={searching} placeholder="Поиск по записям"/>
            </div>
        </div>
    )
}

export default NotesHeader;