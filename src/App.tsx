import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./NewNote";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import NoteList from "./NoteList";
import {NoteLayout} from "./NoteLayout";

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
          <Route path="/:id">
            <Route index element={<NoteLayout />} />
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
