import { useState } from "react";

const colors = [
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#EF476F",
    "#8338EC"
];

type Note = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
};

type NoteBoardProps = {
    info: Note[];
    onNoteDeleted: () => void;
};

export default function NoteBoard({
    info,
    onNoteDeleted
}: NoteBoardProps) {
    return (
        <div className="notesBoard">
            <h1>My Notes</h1>
            <div className="notesCont">
            {info.map((note) => (
                <Note
                    key={note.id}
                    info={note}
                    onNoteDeleted={onNoteDeleted}
                />
            ))}
            </div>
        </div>
    );
}

interface NoteProps {
    info: Note;
    onNoteDeleted: () => void;
}

function Note({ info, onNoteDeleted }: NoteProps) {
    const [color] = useState(
        () => colors[Math.floor(Math.random() * colors.length)]
    );

    async function handleDelete(id: number) {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        await onNoteDeleted();
    }

    return (
        <div className="note" style={{ backgroundColor: color }}>
            <h2>{info.title}</h2>
            <p>{info.content}</p>

            <button onClick={() => handleDelete(info.id)}>
                Delete
            </button>
        </div>
    );
}