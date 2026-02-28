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
    }
  }
})

export const { addNote } = notesSlice.actions
export default notesSlice.reducer