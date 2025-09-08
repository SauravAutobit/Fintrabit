import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface ComponentNameInputProps {
  componentName: string;
  setComponentName: (value: string) => void;
}
const ComponentNameInput = ({
  componentName,
  setComponentName,
}: ComponentNameInputProps) => {
  return (
    <>
      <Form.Group as={Col} md="12" controlId="formUserId">
        <Form.Label className="input-heading">Component Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Component Name"
          name="componentName"
          className="detailsForm-input"
          value={componentName}
          onChange={(e) => {
            setComponentName(e.target.value);
          }}
        />
      </Form.Group>
    </>
  );
};

export default ComponentNameInput;
