import './writingArea.css'

function Main({activeNote, onUpdateNote, valueTitle, setValueTitle, valueBody, setValueBody}){

    
const onEditField = (title, valueTitle, body, valueBody) => {
        onUpdateNote({
            ...activeNote,
            title: valueTitle,
            body: valueBody,
            lastChanged: Date.now(),
        })
    }

    if(!activeNote)return <div className="center">Создайте новую запись и нажмите на нее</div>

    return (
        <div className="main-wrapper">
            <div className="main-note-edit">

                <button className='saveBtn' 
                onClick={()=> onEditField('title', valueTitle, 'body', valueBody)}
                >Сохранить задачу</button>

                <input  
                    type='text'
                    className='title'
                    value={valueTitle}
                    placeholder='Введите имя задачи'
                    onChange={(e) => setValueTitle(e.target.value)} 
                    autoFocus
                />

                <textarea 
                    className="body" 
                    placeholder="Введите содержание..." 
                    value={valueBody}
                    onChange={(e) => setValueBody(e.target.value)} 
                >
                    
                </textarea>
            </div>

            <div className="main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <div className="note-preview">{activeNote.body}</div>
            </div>
        </div>
    )
}

export default Main;