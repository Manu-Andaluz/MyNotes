"use client";
import React, { useEffect, useState } from "react";
import { useRequests } from "./hooks/requests";

const closeDialog = (e) => {
  const dialog = document.getElementById("add-note-modal");
  dialog.close();
};

const AddNote = () => {
  const { createNote } = useRequests();
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    let textarea = document.getElementById("myTextarea");
    // Set the cursor to the end of the text
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  }, []);

  const handleDone = () => {
    createNote(newNote);
    setNewNote("");
  };

  return (
    <dialog id={"add-note-modal"} className="dialog">
      <div className="notes-modal-item">
        <div>
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
      </div>
    </dialog>
  );
};

export default AddNote;
