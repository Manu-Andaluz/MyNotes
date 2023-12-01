"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRequests } from "./hooks/requests";

const closeDialog = (e) => {
  var dialog = document.getElementById("note-modal");
  //dialog.classList.add(styles.close);
  //   const animationEndHandler = (event) => {
  //     dialog.close();
  //     //dialog.classList.remove(styles.close);
  //     //dialog.removeEventListener("animationend", animationEndHandler);
  //   };
  dialog.close();
  //dialog.addEventListener("animationend", animationEndHandler);
};

const EditNote = ({ note }) => {
  console.log(note);
  const { createNote, updateNote, deleteNote } = useRequests();
  const [newNote, setNewNote] = useState(note ? note : "");

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
    if (note?.id) {
      updateNote(newNote);
      setNewNote("");
    } else {
      createNote(newNote);
      setNewNote("");
    }
  };

  return (
    <dialog id={"note-modal"} className="dialog">
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
        {note?.id && (
          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </button>
        )}
      </div>
    </dialog>
  );
};

export default EditNote;
