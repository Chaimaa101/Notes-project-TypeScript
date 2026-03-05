import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import { v4 as uuidV4 } from "uuid"
import type { RawNote } from "../App"

const initialState: RawNote[] = []

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{title: string, markdown: string, tagIds: string[]}>) => {
      state.push({
        id: uuidV4(),
        ...action.payload
      })
    },
    editNote: (state, action: PayloadAction<{id:string,title: string, markdown: string, tagIds: string[]}>) => {
     const note = state.find(n => n.id === action.payload.id)

     if(note){
      note.title = action.payload.title
      note.markdown = action.payload.markdown
      note.tagIds = action.payload.tagIds
     }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      return state.filter(note => note.id !== action.payload)
    }
  }
})

export const { addNote ,editNote ,deleteNote} = notesSlice.actions
export default notesSlice.reducer