import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Note } from "./models/note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadNotes();
  }, []);

  return <div>{JSON.stringify(notes)}</div>;
};

export default App;
