import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "./network/notes_api";
import Note from "./components/Note";
import styles from "./styles/NotesPage.module.css";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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
