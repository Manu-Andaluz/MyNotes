import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRequests = () => {
  const [notes, setNotes] = useState([]);

  const closeDialog = () => {
    const dialog = document.getElementById("note-modal");
    dialog.close();
  };

  const closeNewNoteDialog = () => {
    const dialog = document.getElementById("add-note-modal");
    dialog.close();
  };

  const getNotes = async () => {
    let response;
    try {
      response = await axios.get("http://localhost:8000/api/notes/");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  const getNote = async () => {
    if (noteId === "new") return;

    try {
      let response = await axios.get(
        `http://localhost:8000/api/notes/${noteId}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (newNote) => {
    axios.post(
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
    closeNewNoteDialog();
  };

  const updateNote = async (newNote) => {
    axios.patch(
      `http://localhost:8000/api/notes/${newNote.id}/update/`,
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
    closeDialog();
  };

  const deleteNote = async (noteId) => {
    axios.delete(`http://localhost:8000/api/notes/${noteId}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    closeDialog();
  };

  return {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    notes,
    setNotes,
    closeDialog,
    closeNewNoteDialog,
  };
};
