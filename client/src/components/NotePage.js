"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  let [note, setNote] = useState("");

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new") return;

    let response = await axios.get(
      `http://localhost:8000/api/notes/${noteId}/`
    );
    setNote(response.data);
  };

  let createNote = async () => {
    axios.post(
      `http://localhost:8000/api/notes/`,
      {
        body: note.body,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  let updateNote = async () => {
    axios.patch(
      `http://localhost:8000/api/notes/${noteId}/update/`,
      {
        body: note.body,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  let deleteNote = async () => {
    axios.delete(`http://localhost:8000/api/notes/${noteId}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/");
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
    router.push("/");
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3 onClick={handleSubmit}>
          <ArrowLeft />
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
