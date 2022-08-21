import {loadState, saveState} from './localStorage';
import "./App.css";
import Notes from "./components/notes/Notes";
import WritingArea from "./components/writingArea/WritingArea";

function App() {
  return (
    <div className="App">
      <Notes />
      <WritingArea />
    </div>
  );
}

export default App;
