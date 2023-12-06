"use client";
import React, { useEffect, useState } from "react";
import { useRequests } from "./hooks/requests";

const AddNote = ({ setNotes }) => {
  const { closeNewNoteDialog, createNote, getNotes } = useRequests();
  const [newNote, setNewNote] = useState({ body: "", title: "" });

  useEffect(() => {}, [newNote]);

  useEffect(() => {
    let textarea = document.getElementById("nose");
    // Set the cursor to the end of the text
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  }, []);

  const handleDone = async () => {
    await createNote(newNote);
    setNewNote((data) => {
      return { body: "", title: "" };
    });
    await getNotes(setNotes);
    closeNewNoteDialog();
  };

  return (
    <dialog id={"add-note-modal"} className="dialog">
      <div className="notes-modal-item">
        <div className="container-modal-item">
          <textarea
            className="title-area-modal"
            placeholder="Title"
            maxLength={50}
            onChange={(e) => {
              setNewNote((note) => ({ ...note, title: e.target.value }));
            }}
            value={newNote.title}
          ></textarea>
          <textarea
            id="nose"
            placeholder="Note ..."
            className="text-area-modal"
            onChange={(e) => {
              setNewNote((note) => ({ ...note, body: e.target.value }));
            }}
            value={newNote.body}
          ></textarea>
        </div>
      </div>
      <div className="modal-buttons">
        <button onClick={closeNewNoteDialog}>Cancel</button>
        <button onClick={handleDone}>Done</button>
      </div>
    </dialog>
  );
};

export default AddNote;
