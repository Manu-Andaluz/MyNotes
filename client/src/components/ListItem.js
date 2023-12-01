import React from "react";
import EditNote from "./EditNote";

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

let getTitle = (note) => {
  let title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

const showDialog = () => {
  let element = document.getElementById("note-modal");
  element.showModal();
};

const ListItem = ({ note, setNewNotes }) => {
  return (
    <>
      <div
        className="notes-list-item"
        onClick={() => {
          setNewNotes(note);
          showDialog();
        }}
      >
        <div>
          <h3>{getTitle(note)}</h3>
          <p>{note.body}</p>
        </div>
        <div>
          <hr />
          <span>{getTime(note)}</span>
        </div>
      </div>
    </>
  );
};

export default ListItem;
