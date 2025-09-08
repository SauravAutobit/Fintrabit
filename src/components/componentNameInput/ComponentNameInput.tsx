import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface ComponentNameInputProps {
  propertyName: string;
  setPropertyName: (value: string) => void;
}
const ComponentNameInput = ({
  propertyName,
  setPropertyName,
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
          value={propertyName}
          onChange={(e) => {
            setPropertyName(e.target.value);
          }}
        />
      </Form.Group>
    </>
  );
};

export default ComponentNameInput;
