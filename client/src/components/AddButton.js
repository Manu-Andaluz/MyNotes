import React from "react";
import AddIcon from "../assets/add.svg";
import Link from "next/link";

const Icon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <title>add</title>
    <path d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"></path>
  </svg>
);

const AddButton = () => {
  const showDialog = () => {
    let element = document.getElementById("note-modal");
    element.showModal();
  };
  return (
    <div onClick={showDialog} className="floating-button">
      <Icon />
    </div>
  );
};

export default AddButton;
