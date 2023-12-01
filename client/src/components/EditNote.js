"use client";
import React, { useEffect, useState } from "react";
import { useRequests } from "./hooks/requests";

const EditNote = ({ note }) => {
  console.log(note.title);
  const { updateNote, deleteNote, closeDialog } = useRequests();
  const [newNote, setNewNote] = useState(note);

  useEffect(() => {
    setNewNote(note);
  }, [note]);

  useEffect(() => {
    let textarea = document.getElementById("myTextarea");
    // Set the cursor to the end of the text
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  }, []);

  const handleDone = () => {
    updateNote(newNote);
    setNewNote("");
  };

  return (
    <dialog id={"note-modal"} className="dialog">
      <div className="notes-modal-item">
        <div>
          <textarea
            className="title-area-modal"
            maxLength={50}
            onChange={(e) => {
              setNewNote((note) => ({ ...note, title: e.target.value }));
            }}
            value={newNote.title}
          ></textarea>
          <textarea
            id="myTextarea"
            className="text-area-modal"
            onChange={(e) => {
              setNewNote((note) => ({ ...note, body: e.target.value }));
            }}
            value={newNote.body}
          ></textarea>
        </div>
      </div>
      <div className="modal-buttons">
        <button onClick={closeDialog}>Cancel</button>
        <button onClick={handleDone}>Done</button>
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
      </div>
    </dialog>
  );
};

export default EditNote;
