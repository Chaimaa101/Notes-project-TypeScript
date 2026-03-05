import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { deleteTag, editTag } from "./store/TagsSlice";
import { useNavigate } from "react-router-dom";

type EditTagsProps = {
  show: boolean;
  handleClose: () => void;
};

export function EditTagsModal({ show, handleClose }: EditTagsProps) {
  const availableTags = useSelector((state: RootState) => state.tags);
    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} onChange={e => dispatch(editTag({id: tag.id,label: e.target.value}))}/>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-danger" onClick={() => {
                    dispatch(deleteTag(tag.id))
                    navigate("..")
                  }}>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
