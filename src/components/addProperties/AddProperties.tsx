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
  length: string;
  lengthType: string;
}

interface AddPropertiesProps {
  indexNumber: number;
  propertyName: string;
}

const AddProperties = ({ indexNumber, propertyName }: AddPropertiesProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState<Property>({
    name: "",
    defaultValue: "",
    dataType: "",
    length: "",
    lengthType: "",
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
      indexNumber === 0 &&
      (newProperty.name.trim() === "" ||
        newProperty.dataType.trim() === "" ||
        newProperty.defaultValue.trim() === "" ||
        propertyName.trim() === "")
    ) {
      alert("Name, Default Vlaue and Data Type are required");
      return;
    } else if (
      indexNumber === 1 &&
      (newProperty.name.trim() === "" ||
        newProperty.dataType.trim() === "" ||
        newProperty.length.trim() === "" ||
        newProperty.lengthType.trim() === "" ||
        propertyName.trim() === "")
    ) {
      alert("Name, Length, Data Type and Length Type are required");
      return;
    }
    setProperties([...properties, newProperty]);
    setNewProperty({
      name: "",
      defaultValue: "",
      dataType: "",
      length: "",
      lengthType: "",
    }); // Reset the form
  };

  return (
    <div>
      <div className="properties-heading">Properties</div>

      <Accordion className="properties-accordion">
        {properties.length !== 0 &&
          properties.map((property, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{propertyName}</Accordion.Header>
              <Accordion.Body>
                <Row className="mb-3">
                  {/* <Form.Group as={Col} md="12" controlId="formUserId">
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Property Name"
                      name="propertyName"
                      value={property.name}
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
                  </Form.Group> */}
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
                    <Form.Label>Data Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Data Type"
                      name="dataType"
                      value={property.dataType}
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

                  {/* <Form.Group as={Col} md="6" controlId="formip">
                    <Form.Label>Visible to</Form.Label>
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
                  </Form.Group> */}
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
            <Form.Label>
              {indexNumber === 0 ? "Default Value" : "Length"}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={
                indexNumber === 0 ? "Enter Default Value" : "Enter Length"
              }
              name={indexNumber === 0 ? "defaultValue" : "length"}
              value={
                indexNumber === 0
                  ? newProperty.defaultValue
                  : newProperty.length
              }
              onChange={handleInputChange}
              className="detailsForm-input"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            md={indexNumber === 0 ? "12" : "6"}
            controlId="formUserId"
          >
            <Form.Label>Data Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Data Type"
              name="dataType"
              value={newProperty.dataType}
              onChange={handleInputChange}
              className="detailsForm-input"
            />
          </Form.Group>
          {indexNumber === 1 && (
            <Form.Group as={Col} md="6" controlId="formUserId">
              <Form.Label>Length Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Length Type"
                name="lengthType"
                value={newProperty.lengthType}
                onChange={handleInputChange}
                className="detailsForm-input"
              />
            </Form.Group>
          )}

          {/* {indexNumber === 0 ? (
            <Form.Group as={Col} md="12" controlId="formUserId">
              <Form.Label>Data Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Data Type"
                name="dataType"
                value={newProperty.dataType}
                onChange={handleInputChange}
                className="detailsForm-input"
              />
            </Form.Group>
          ) : (
            <>
              <Form.Group as={Col} md="6" controlId="formUserId">
                <Form.Label>Data Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Data Type"
                  name="dataType"
                  value={newProperty.dataType}
                  onChange={handleInputChange}
                  className="detailsForm-input"
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formUserId">
                <Form.Label>Length Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Length Type"
                  name="lengthType"
                  value={newProperty.dataType}
                  onChange={handleInputChange}
                  className="detailsForm-input"
                />
              </Form.Group>
            </>
          )} */}
        </Row>

        <div className="queryBar-addMore" onClick={addProperty}>
          + Add another property
        </div>
      </div>
    </div>
  );
};

export default AddProperties;
