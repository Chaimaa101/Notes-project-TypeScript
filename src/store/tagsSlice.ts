import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Tag } from "../App"

const initialState: Tag[] = []

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<Tag>) => {
      state.push(action.payload)
    }
  }
})

export const { addTag } = tagsSlice.actions
export default tagsSlice.reducer