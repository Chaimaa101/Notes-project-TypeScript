import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import NewNote from "./NewNote";

  export type Note = {
    id : string,
  } & NoteData

export type RawNote = {
  title : string,
    markdown: string,
    tagIds: string[]
}

  export type NoteData = {
    title : string,
    markdown: string,
    tags: Tag[]
  }

  export type Tag = { 
    id: string,
    label : string
  }

function App() {
const [notes,setNotes] = useLocalStorage<RawNote[]>("notes", [])
const [tags,setTags] = useLocalStorage<Tag[]>("tags", [])
  return (
    <>
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Hi Chaimaa, home</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
      </Container>
    </>
  );
}

export default App;
