import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "./network/notes_api";
import Note from "./components/Note";
import styles from "./styles/NotesPage.module.css";
import AddNoteDialog from "./components/AddNoteDialog";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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
      <Button className="mb-4" onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => {
          return (
            <Col key={note._id}>
              <Note note={note} className={styles.note} />;
            </Col>
          );
        })}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
};

export default App;
