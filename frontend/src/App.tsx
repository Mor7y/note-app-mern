import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import axios from "axios";
import Note from "./components/Note";
import styles from "./styles/NotesPage.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

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

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => {
          return (
            <Col key={note._id}>
              <Note note={note} className={styles.note} />;
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default App;
