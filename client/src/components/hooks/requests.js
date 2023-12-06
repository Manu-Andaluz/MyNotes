import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRequests = () => {
  const closeDialog = () => {
    const dialog = document.getElementById("note-modal");
    dialog.close();
  };

  const closeNewNoteDialog = () => {
    const dialog = document.getElementById("add-note-modal");
    dialog.close();
  };

  const getNotes = async (setNotes) => {
    let response;
    try {
      response = await axios.get(
        "https://mynotes-production-ac8e.up.railway.app/api/notes/"
      );
      await setNotes((data) => response.data);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  const getNote = async () => {
    if (noteId === "new") return;

    try {
      let response = await axios.get(
        `https://mynotes-production-ac8e.up.railway.app/api/notes/${noteId}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (newNote) => {
    const colors = ["#fef68a", "#e3f4f4", "#faf2d3", "#d0e7d2"];
    const randomColor = Math.floor(Math.random() * colors.length);

    await axios.post(
      `https://mynotes-production-ac8e.up.railway.app/api/notes/create/`,
      {
        body: newNote.body,
        title: newNote.title,
        color: colors[randomColor],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const updateNote = async (newNote) => {
    await axios.patch(
      `https://mynotes-production-ac8e.up.railway.app/api/notes/${newNote.id}/update/`,
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

  const deleteNote = async (noteId) => {
    await axios.delete(
      `https://mynotes-production-ac8e.up.railway.app/api/notes/${noteId}/delete`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    closeDialog,
    closeNewNoteDialog,
  };
};
