import { useState } from 'react';
import AddNotes from './add-notes/AddNotes';
import NotesHeader from './notes-header/NotesHeader';

import './notes.css';

function Notes({notes, onAddNote, onDeleteNote, activeNote, setActiveNote, setValueTitle, setValueBody}){
    
    const [searchValue, setSearchValue] = useState('');
    const Searching = function(event){
        setSearchValue(event.target.value);
      }
   
    return (
    <div className="notes-wrapper">
        <NotesHeader 
            onAddNote={onAddNote}
            searching={Searching}
        />

        <div>
            <AddNotes 
                notes={notes}
                searchValue={searchValue}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onDeleteNote={onDeleteNote}
                setValueTitle={setValueTitle}
                setValueBody={setValueBody}
            /> 
        </div>
    </div>
)}

export default Notes;

     