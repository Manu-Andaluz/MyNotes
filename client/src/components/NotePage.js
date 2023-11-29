"use client";
import React, { useState, useEffect } from "react";

const ArrowLeft = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <title>chevron-left</title>
    <path d="M11 16l13-13v-3l-16 16 16 16v-3l-13-13z"></path>
  </svg>
);

const NotePage = ({ match, history, noteId }) => {
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new") return;

    let response = await fetch(`http://localhost:8000/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let updateNote = async () => {
    fetch(`/api/notes/${noteId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${noteId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history.push("/");
  };

  let handleSubmit = () => {
    console.log("NOTE:", note);
    if (noteId !== "new" && note.body == "") {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
    history.push("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
