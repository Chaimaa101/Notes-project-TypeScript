import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { RootState } from "./store/store";
import type { Tag } from "./App";
import { selectNotesWithTags } from "./store/selectors";
import NoteCard from "./NoteCard";
import { EditTagsModal } from "./EditTgsModal";

function NoteList() {
  const availableTags = useSelector((state: RootState) => state.tags);
  const [selectedTags, setselectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const notes = useSelector(selectNotesWithTags);
  const [show, setShow] = useState(false);

  const filterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id),
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() =>setShow(true)}>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
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
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filterNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal show={show} handleClose={() => setShow(false)} />
    </>
  );
}

export default NoteList;
