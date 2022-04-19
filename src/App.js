import './App.css';
import Notes from './components/notes/Notes';
import WritingArea from './components/writingArea/WritingArea';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

function App() {
  
const [notes, setNotes] = useState(
  localStorage.notes ? JSON.parse(localStorage.notes) : []
);

useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);



const [activeNote, setActiveNote] = useState(false);

const [valueTitle, setValueTitle] = useState('');
const [valueBody, setValueBody] = useState('');

const onAddNote = () => {
  const newNote = {
    id: uuid(),
    title: 'Имя задачи',
    body: '',
    lastChanged: Date.now(),
  }
  setNotes([newNote, ...notes]);
}

const onUpdateNote = (updateNote) => {
  const updatedNotesArray = notes.map((note) => {
    if(note.id === activeNote){
      return updateNote;
    }
    return note
  });

  setNotes(updatedNotesArray)
}

const onDeleteNote = (id) => {
  setNotes(notes.filter((note) => note.id !== id));
}

const getActiveNote = () => {
  return notes.find((note) => note.id === activeNote);
}
  
return (
    <div className="App">
      <Notes 
        notes={notes} 
        onAddNote={onAddNote} 
        onDeleteNote={onDeleteNote} 
        activeNote={activeNote} 
        setActiveNote={setActiveNote}
        setValueTitle={setValueTitle}
        setValueBody={setValueBody}
      />
      
      <WritingArea
        activeNote={getActiveNote()}  
        onUpdateNote={onUpdateNote}
        valueTitle={valueTitle}
        setValueTitle={setValueTitle}
        valueBody={valueBody}
        setValueBody={setValueBody}
      />
    </div>
  );
}

export default App;