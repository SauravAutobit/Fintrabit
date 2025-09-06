import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const ComponentNameInput = () => {
  return (
    <>
      <Form.Group as={Col} md="12" controlId="formUserId">
        <Form.Label className="input-heading">Component Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Component Name"
          name="componentName"
          className="detailsForm-input"
        />
      </Form.Group>
    </>
  );
};

export default ComponentNameInput;
