import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import {NoteLayout} from "./NoteLayout";
import { Note } from "./Note";
import EditNote from "./EditNote";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
 

  return (
    <>
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route
            path="/new"
            element={
              <NewNote
              />
            }
          />
          <Route path="/:id" element={<NoteLayout />}>
            <Route index element={<Note  />} />
            <Route path="edit" element={<EditNote />} />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
