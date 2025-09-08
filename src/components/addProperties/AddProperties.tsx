import "./AddProperties.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import EditDelete from "../editDelete/EditDelete";
import { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

interface Property {
  name: string;
  defaultValue: string;
  dataType: string;
  length: string;
  lengthType: string;
}

interface AddPropertiesProps {
  indexNumber: number;
  properties: Property[];
  newProperty: Property; // The property currently being typed
  onHandleInputChange: (name: string, value: string) => void;
  onAddProperty: () => void; // Function to add the property to the list
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

const AddProperties = ({
  indexNumber,
  properties,
  newProperty,
  onHandleInputChange,
  onAddProperty,
  setProperties,
}: AddPropertiesProps) => {
  const [editableIndex, setEditableIndex] = useState<number | null>(null);

  const deleteProperty = (indexToDelete: number) => {
    const remaining = properties.filter((_, index) => index !== indexToDelete);
    setProperties(remaining);
  };

  // 1. A new helper function to handle editing properties in the list
  const handlePropertyUpdate = (
    indexToUpdate: number,
    fieldName: keyof Property,
    value: string
  ) => {
    const updatedProperties = properties.map((prop, index) => {
      if (index === indexToUpdate) {
        return { ...prop, [fieldName]: value };
      }
      return prop;
    });
    setProperties(updatedProperties);
  };
  return (
    <div>
      <div className="properties-heading">Properties</div>

      <Accordion className="properties-accordion">
        {properties.length !== 0 &&
          properties.map((property, index) => {
            const isCurrentlyEditing = editableIndex === index;

            return (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{property.name}</Accordion.Header>
                <Accordion.Body>
                  {/* --- STATIC property display with Dropdown --- */}
                  {indexNumber === 0 && (
                    <>
                      <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={property.name}
                            disabled={!isCurrentlyEditing}
                            onChange={(e) =>
                              handlePropertyUpdate(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className={
                              isCurrentlyEditing
                                ? "detailsForm-input"
                                : "detailsForm-input-disabled"
                            }
                          />
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Default Value</Form.Label>
                          <Form.Control
                            type="text"
                            value={property.defaultValue}
                            disabled={!isCurrentlyEditing}
                            onChange={(e) =>
                              handlePropertyUpdate(
                                index,
                                "defaultValue",
                                e.target.value
                              )
                            }
                            className={
                              isCurrentlyEditing
                                ? "detailsForm-input"
                                : "detailsForm-input-disabled"
                            }
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md={12}>
                          <Form.Label>Data Type</Form.Label>
                          <DropdownButton
                            id={`dropdown-datatype-${index}`}
                            title={property.dataType || "Select Data Type"}
                            className={
                              isCurrentlyEditing
                                ? "dropDown-btn"
                                : "detailsForm-input-disabled"
                            }
                            disabled={!isCurrentlyEditing}
                          >
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(index, "dataType", "int")
                              }
                            >
                              int
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "dataType",
                                  "numeric"
                                )
                              }
                            >
                              numeric
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "dataType",
                                  "string"
                                )
                              }
                            >
                              string
                            </Dropdown.Item>
                          </DropdownButton>
                        </Form.Group>
                      </Row>
                    </>
                  )}

                  {/* --- DYNAMIC property display with Dropdowns --- */}
                  {indexNumber === 1 && (
                    <>
                      <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={property.name}
                            disabled={!isCurrentlyEditing}
                            onChange={(e) =>
                              handlePropertyUpdate(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className={
                              isCurrentlyEditing
                                ? "detailsForm-input"
                                : "detailsForm-input-disabled"
                            }
                          />
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Length</Form.Label>
                          <Form.Control
                            type="number"
                            value={property.length}
                            disabled={!isCurrentlyEditing}
                            onChange={(e) =>
                              handlePropertyUpdate(
                                index,
                                "length",
                                e.target.value
                              )
                            }
                            className={
                              isCurrentlyEditing
                                ? "detailsForm-input"
                                : "detailsForm-input-disabled"
                            }
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Data Type</Form.Label>
                          <DropdownButton
                            id={`dropdown-datatype-${index}`}
                            title={property.dataType || "Select Data Type"}
                            className={
                              isCurrentlyEditing
                                ? "dropDown-btn"
                                : "detailsForm-input-disabled"
                            }
                            disabled={!isCurrentlyEditing}
                          >
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(index, "dataType", "int")
                              }
                            >
                              int
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "dataType",
                                  "numeric"
                                )
                              }
                            >
                              numeric
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "dataType",
                                  "string"
                                )
                              }
                            >
                              string
                            </Dropdown.Item>
                          </DropdownButton>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                          <Form.Label>Length Type</Form.Label>
                          <DropdownButton
                            id={`dropdown-lengthtype-${index}`}
                            title={property.lengthType || "Select Length Type"}
                            className={
                              isCurrentlyEditing
                                ? "dropDown-btn"
                                : "detailsForm-input-disabled"
                            }
                            disabled={!isCurrentlyEditing}
                          >
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "lengthType",
                                  "upto"
                                )
                              }
                            >
                              upto
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "lengthType",
                                  "exact"
                                )
                              }
                            >
                              exact
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                handlePropertyUpdate(
                                  index,
                                  "lengthType",
                                  "infinite"
                                )
                              }
                            >
                              infinite
                            </Dropdown.Item>
                          </DropdownButton>
                        </Form.Group>
                      </Row>
                    </>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <EditDelete
                      isEditing={isCurrentlyEditing}
                      onEdit={() => setEditableIndex(index)} // Set this item as editable
                      onSave={() => setEditableIndex(null)} // Exit edit mode
                      onDelete={() => deleteProperty(index)}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
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
              onChange={(e) =>
                onHandleInputChange(e.target.name, e.target.value)
              }
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
              onChange={(e) =>
                onHandleInputChange(e.target.name, e.target.value)
              }
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
            <DropdownButton
              id="dropdown-datatype"
              title={newProperty.dataType || "Select Data Type"}
              className="dropDown-btn"
            >
              <Dropdown.Item
                onClick={() => onHandleInputChange("dataType", "int")}
              >
                int
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onHandleInputChange("dataType", "numeric")}
              >
                numeric
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onHandleInputChange("dataType", "string")}
              >
                string
              </Dropdown.Item>
            </DropdownButton>
          </Form.Group>
          {indexNumber === 1 && (
            <Form.Group as={Col} md="6" controlId="formUserId">
              <Form.Label>Length Type</Form.Label>
              <DropdownButton
                id="dropdown-lengthType"
                title={newProperty.lengthType || "Select Length"}
                className="dropDown-btn"
              >
                <Dropdown.Item
                  onClick={() => onHandleInputChange("lengthType", "upto")}
                >
                  upto
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => onHandleInputChange("lengthType", "exact")}
                >
                  exact
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => onHandleInputChange("lengthType", "infinite")}
                >
                  infinite
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          )}
        </Row>

        <div className="queryBar-addMore" onClick={onAddProperty}>
          + Add another property
        </div>
      </div>
    </div>
  );
};

export default AddProperties;
