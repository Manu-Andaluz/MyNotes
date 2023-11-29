import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import AddButton from "./AddButton";
import axios from "axios";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    try {
      let response = await axios.get("http://localhost:8000/api/notes/");
      console.log(response.data);
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesListPage;
