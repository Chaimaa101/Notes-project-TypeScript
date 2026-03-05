import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Tag } from "../App"

const initialState: Tag[] = []

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<Tag>) => {
      state.push(action.payload)
    },
    editTag: (state , action: PayloadAction<{id: string, label:string}>) =>{
      const tag = state.find(tag => tag.id === action.payload.id)
      if(tag){
        tag.label = action.payload.label
      }
    },
    deleteTag: (state, action: PayloadAction<string>) =>{
      return state.filter(tag => tag.id !== action.payload)
    }
  }
})

export const { addTag ,editTag , deleteTag} = tagsSlice.actions
export default tagsSlice.reducer