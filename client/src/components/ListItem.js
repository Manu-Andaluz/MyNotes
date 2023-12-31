import React from "react";
import EditNote from "./EditNote";

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
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
        style={{ backgroundColor: note.color ? note.color : "" }}
      >
        <div>
          <h3>{note.title ? note.title : "Untitled"}</h3>
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
