import type { RootState } from "./store"

export const selectNotesWithTags = (state: RootState) => {
  const rawNotes = state.notes
  const tags = state.tags

  return rawNotes.map(note => ({
    ...note,
    tags: tags.filter(tag => note.tagIds.includes(tag.id))
  }))
}