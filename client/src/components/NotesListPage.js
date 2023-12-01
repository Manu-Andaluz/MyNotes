import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import AddButton from "./AddButton";
import EditNote from "./EditNote";
import { useRequests } from "./hooks/requests";
import AddNote from "./AddNote";
import axios from "axios";

const NotesListPage = () => {
  // const { getNotes, closeDialog } = useRequests();
  const [newNote, setNewNotes] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const response = await axios.get("http://localhost:8000/api/notes/");
      setNotes((data) => response.data);
    };
    getNotes();
  }, []);

  useEffect(() => {}, [notes]);

  return (
    <>
      <AddNote setNotes={setNotes} />
      <EditNote note={newNote} setNotes={setNotes} />
      <div className="notes">
        <div className="notes-header">
          <h2 className="notes-title">&#9782; MyNotes</h2>
          <p className="notes-count">{notes.length}</p>
        </div>

        <div className="notes-list">
          {notes.length ? (
            notes.map((note, index) => (
              <ListItem key={index} note={note} setNewNotes={setNewNotes} />
            ))
          ) : (
            <p>Loading ... </p>
          )}
        </div>
        <AddButton />
      </div>
    </>
  );
};

export default NotesListPage;
