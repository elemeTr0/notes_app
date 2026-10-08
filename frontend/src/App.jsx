import './App.css'
import { useState } from "react";
import NoteBoard from "./components/NoteBoard";
import Login from "./components/Login";
import NewNote from "./components/NewNote";

function App() {
    const [notes, setNotes] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    async function fetchNotes() {
    const response = await fetch("http://localhost:3000/notes", {
        credentials: "include"
    });

    const data = await response.json();

    setNotes(data);
}

    async function handleLogin() {
        setLoggedIn(true);

        await fetchNotes();
    }
    

    if (loggedIn) {
    return (
        <div className="app">
            <button onClick={() => setIsOpen(true)}>
                Add note
            </button>

            <NoteBoard info={notes} onNoteDeleted={fetchNotes} />

            {isOpen && (
                <NewNote
                    onClose={() => setIsOpen(false)}
                    onNoteCreated={fetchNotes}
                />
            )}
        </div>
    );
} else {
        return (
            <Login onLogin={handleLogin} />
        );
    }
}

export default App;