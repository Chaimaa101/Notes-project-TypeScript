import { useSelector } from "react-redux"
import { selectNotesWithTags } from "./store/selectors"
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import type { Note } from "./App"


export function NoteLayout() {

    const notes = useSelector(selectNotesWithTags)
    const {id} = useParams()
    const note = notes.find(n => n.id === id)

    if(note == null) return <Navigate to="/" replace />

  return (
    <>
      <Outlet context={note} /> 
    </>
  )
}

export function useNote(){
    return useOutletContext<Note>()
}
