import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const params = useParams();
  const noteId = params.id;
  const nav = useNavigate();
  const [note, setNote] = useState(null);
  useEffect(() => {
    getNote();
  });

  const getNote = async () => {
    if (noteId === "new") return;

    const response = await fetch(`/api/notes/${noteId}/`);
    const data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    });
  };

  const updateNote = async () => {
    await fetch(`/api/notes/${noteId}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    });
  };

  const deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    nav("/", { replace: true });
  };

  const handleSubmit = () => {
    if (noteId !== "new" || note.body === null) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note.body !== null) {
      createNote();
    }
    nav("/", { replace: true });
  };

  const handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
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
