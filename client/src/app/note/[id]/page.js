import NotePage from "@/components/NotePage";
import React from "react";

const index = ({ params: { id } }) => {
  return <NotePage noteId={id} />;
};

export default index;
