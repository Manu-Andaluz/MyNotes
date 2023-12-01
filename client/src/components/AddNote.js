"use client";
import React, { useEffect, useState } from "react";
import { useRequests } from "./hooks/requests";
import axios from "axios";

const AddNote = ({ setNotes }) => {
  const { closeNewNoteDialog } = useRequests();
  const [newNote, setNewNote] = useState(0);

  useEffect(() => {
    let textarea = document.getElementById("myTextarea");
    // Set the cursor to the end of the text
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  }, []);

  const handleDone = async () => {
    const createNote = async () => {
      await axios.post(
        `http://localhost:8000/api/notes/create/`,
        {
          body: newNote.body,
          title: newNote.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    await createNote(newNote);
    const getNotes = async () => {
      const response = await axios.get("http://localhost:8000/api/notes/");
      setNotes((data) => response.data);
    };
    await getNotes();
    closeNewNoteDialog();
    setNewNote("");
  };

  return (
    <dialog id={"add-note-modal"} className="dialog">
      <div className="notes-modal-item">
        <div>
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
            id="myTextarea"
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
        <button onClick={() => closeNewNoteDialog()}>Cancel</button>
        <button onClick={handleDone}>Done</button>
      </div>
    </dialog>
  );
};

export default AddNote;
