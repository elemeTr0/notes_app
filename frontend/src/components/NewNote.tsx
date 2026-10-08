import { useState } from "react";

type NewNoteProps = {
    onClose: () => void;
    onNoteCreated: () => void;
};

function NewNote({ onClose, onNoteCreated }: NewNoteProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        });

        const data = await response.json();

        console.log(data);

        await onNoteCreated();
        onClose();
    }

    return (
        <div className="backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                    />

                    <button type="submit">
                        Create note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewNote;