import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import NoteForm from "./NoteForm"
import { addNote } from "./store/NotesSlice"

function NewNote() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <NoteForm
      onSubmit={(data) => {
        dispatch(addNote(data))
        navigate("..")
      }}
    />
  )
}

export default NewNote