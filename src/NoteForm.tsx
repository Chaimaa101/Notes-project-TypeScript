import { useRef, useState, type FormEvent } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { type Tag } from "./App";
import { v4 as uuidV4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "./store/NotesSlice";
import type { RootState } from "./store/store";
import { addTag } from "./store/TagsSlice";

function NoteForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setselectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate()

  const dispatch = useDispatch();
  const availableTags = useSelector((state: RootState) => state.tags);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    dispatch(
      addNote({
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tagIds: selectedTags.map((tag) => tag.id),
      }),
    );
navigate("..")

  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    dispatch(addTag(newTag));
                    setselectedTags((prev) => [...prev, newTag]);
                  }}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setselectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      }),
                    );
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control ref={markdownRef} required as="textarea" rows={15} />
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
    </>
  );
}

export default NoteForm;
