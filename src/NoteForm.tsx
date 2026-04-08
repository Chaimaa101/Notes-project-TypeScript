import { useRef, useState, type FormEvent } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { type Tag } from "./App"
import { v4 as uuidV4 } from "uuid"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./store/store"
import { addTag } from "./store/tagsSlice"

type NoteFormProps = {
  onSubmit: (data: {
    title: string
    markdown: string
    tagIds: string[]
  }) => void
  initialTitle?: string
  initialMarkdown?: string
  initialTags?: Tag[]
}

function NoteForm({
  onSubmit,
  initialTitle = "",
  initialMarkdown = "",
  initialTags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags)

  const dispatch = useDispatch()
  const availableTags = useSelector((state: RootState) => state.tags)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tagIds: selectedTags.map(tag => tag.id),
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                required
                defaultValue={initialTitle}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                value={selectedTags.map(tag => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags.map(tag => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map(tag => ({
                      id: tag.value,
                      label: tag.label,
                    }))
                  )
                }
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label }
                  dispatch(addTag(newTag))
                  setSelectedTags(prev => [...prev, newTag])
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            required
            as="textarea"
            rows={15}
            defaultValue={initialMarkdown}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm