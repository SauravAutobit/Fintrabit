import "./AddProperties.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import EditDelete from "../editDelete/EditDelete";
import { useState } from "react";

interface Property {
  name: string;
  defaultValue: string;
  dataType: string;
}

const AddProperties = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState<Property>({
    name: "",
    defaultValue: "",
    dataType: "",
  });

  // Handle input change for new property form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  // Handle adding a new property
  const addProperty = () => {
    if (
      setNewProperty.name.trim() === "" ||
      newProperty.dataType.trim() === ""
    ) {
      alert("Name and Data Type are required");
      return;
    }
    setProperties([...properties, newProperty]);
    setNewProperty({ name: "", defaultValue: "", dataType: "" }); // Reset the form
  };

  return (
    <div>
      <div className="properties-heading">Properties</div>

      <Accordion className="properties-accordion">
        {properties.length !== 0 &&
          properties.map((property, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{property.name}</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="formUserId">
                    <Form.Label>Data Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter key"
                      name="dataType"
                      value={property.dataType}
                      onChange={(e) => {
                        if (isEditable) {
                          const updatedProperties = [...properties];
                          updatedProperties[index].dataType = e.target.value;
                          setProperties(updatedProperties);
                        }
                      }}
                      disabled={!isEditable}
                      className={
                        isEditable
                          ? "detailsForm-input"
                          : "detailsForm-input-disabled"
                      }
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formUserId">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter key"
                      name="name"
                      value={property.name}
                      onChange={(e) => {
                        if (isEditable) {
                          const updatedProperties = [...properties];
                          updatedProperties[index].name = e.target.value;
                          setProperties(updatedProperties);
                        }
                      }}
                      disabled={!isEditable}
                      className={
                        isEditable
                          ? "detailsForm-input"
                          : "detailsForm-input-disabled"
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="formip">
                    <Form.Label>Default Value</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Default Value"
                      name="defaultValue"
                      value={property.defaultValue}
                      onChange={(e) => {
                        if (isEditable) {
                          const updatedProperties = [...properties];
                          updatedProperties[index].defaultValue =
                            e.target.value;
                          setProperties(updatedProperties);
                        }
                      }}
                      disabled={!isEditable}
                      className={
                        isEditable
                          ? "detailsForm-input"
                          : "detailsForm-input-disabled"
                      }
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="formUserId">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter key"
                      name="name"
                      value={property.name}
                      onChange={(e) => {
                        if (isEditable) {
                          const updatedProperties = [...properties];
                          updatedProperties[index].name = e.target.value;
                          setProperties(updatedProperties);
                        }
                      }}
                      disabled={!isEditable}
                      className={
                        isEditable
                          ? "detailsForm-input"
                          : "detailsForm-input-disabled"
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="formip">
                    <Form.Label>Default Value</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Default Value"
                      name="defaultValue"
                      value={property.defaultValue}
                      onChange={(e) => {
                        if (isEditable) {
                          const updatedProperties = [...properties];
                          updatedProperties[index].defaultValue =
                            e.target.value;
                          setProperties(updatedProperties);
                        }
                      }}
                      disabled={!isEditable}
                      className={
                        isEditable
                          ? "detailsForm-input"
                          : "detailsForm-input-disabled"
                      }
                    />
                  </Form.Group>
                </Row>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <EditDelete enableEdit={() => setIsEditable(true)} />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>

      <div className="properties-container">
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formUserId">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter key"
              name="name"
              value={newProperty.name}
              onChange={handleInputChange}
              className="detailsForm-input"
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formip">
            <Form.Label>Default Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Default Value"
              name="defaultValue"
              value={newProperty.defaultValue}
              onChange={handleInputChange}
              className="detailsForm-input"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="12" controlId="formUserId">
            <Form.Label>Data Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter key"
              name="dataType"
              value={newProperty.dataType}
              onChange={handleInputChange}
              className="detailsForm-input"
            />
          </Form.Group>
        </Row>

        <div className="queryBar-addMore" onClick={addProperty}>
          + Add another property
        </div>
      </div>
    </div>
  );
};

export default AddProperties;
