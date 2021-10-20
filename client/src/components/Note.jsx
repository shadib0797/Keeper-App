import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {

  function handleClick() {

    fetch('/api', {
      method: 'DELETE',
      body: JSON.stringify({id:props.id}),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
