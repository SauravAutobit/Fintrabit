import Form from "react-bootstrap/Form";
import "./Checkbox.css";

interface CheckboxProps {
  id: string;
}

const Checkbox = ({ id }: CheckboxProps) => {
  return (
    <>
      <Form.Check
        type="checkbox"
        id={id}
        label="Check Box"
        className="custom-checkbox"
      />
    </>
  );
};

export default Checkbox;
