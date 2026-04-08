import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./store/store"
import NoteForm from "./NoteForm"
import { editNote } from "./store/notesSlice"

function EditNote() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const note = useSelector((state: RootState) =>
    state.notes.find(n => n.id === id)
  )

  const tags = useSelector((state: RootState) => state.tags)

  if (!note) return null

  const noteTags = tags.filter(tag =>
    note.tagIds.includes(tag.id)
  )

  return (
    <NoteForm
      initialTitle={note.title}
      initialMarkdown={note.markdown}
      initialTags={noteTags}
      onSubmit={(data) => {
        dispatch(editNote({ id: note.id, ...data }))
        navigate("..")
      }}
    />
  )
}

export default EditNote