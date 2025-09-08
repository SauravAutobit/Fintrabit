import { useState } from "react";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
// import NoDataList from "../../components/noDataList/NoDataList";
// import noUserList from "../../assets/icons/noUserList.svg";
// import { Routing } from "../../utils/constants/routes.constants";

import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import EditDelete from "../../components/editDelete/EditDelete";

import "./PropertiesComponent.css"; // We'll add this for spacing
import CreateStaticComponnet from "../createStaticComponnet/CreateStaticComponnet";
const PropertiesComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [clicked, setClicked] = useState(false);

  // Dummy state to make the inputs inside the accordion work
  const [isEditable, setIsEditable] = useState(false);

  // This is our static dummy data for the properties
  const staticProperties = [
    { name: "stsf", dataType: "sfs", defaultValue: "scdf" },
    { name: "property_2", dataType: "string", defaultValue: "value_2" },
    { name: "property_3", dataType: "number", defaultValue: "123" },
  ];

  console.log("clicked", clicked);
  return (
    <>
      {!clicked ? (
        <>
          <SubHeaderOptions
            options={[
              "Static Properties Component",
              "Dynamic Properties Component",
            ]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            showBtn={true}
            btnText="+ Create Component"
            onClick={() => setClicked(true)}
          />
          {/* ## Outer Accordion for the main component ## */}
          <Accordion
            className="component-list-accordion properties-accordion"
            defaultActiveKey="0"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Component 1</Accordion.Header>
              <Accordion.Body>
                {/* ## Inner Accordion for the properties ## */}
                {/* We reuse 'properties-accordion' class to match your existing styles */}
                <Accordion className="properties-accordion">
                  {staticProperties.map((property, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>{property.name}</Accordion.Header>
                      <Accordion.Body>
                        {/* This form is copied from your AddProperties component */}
                        <Row className="mb-3">
                          <Form.Group as={Col} md="12">
                            <Form.Label>Data Type</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={property.dataType}
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
                          <Form.Group as={Col} md="6">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={property.name}
                              disabled={!isEditable}
                              className={
                                isEditable
                                  ? "detailsForm-input"
                                  : "detailsForm-input-disabled"
                              }
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="6">
                            <Form.Label>Default Value</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={property.defaultValue}
                              disabled={!isEditable}
                              className={
                                isEditable
                                  ? "detailsForm-input"
                                  : "detailsForm-input-disabled"
                              }
                            />
                          </Form.Group>
                        </Row>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <EditDelete enableEdit={() => setIsEditable(true)} />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      ) : (
        <CreateStaticComponnet
          index={selectedTab}
          onClick={() => setClicked(false)}
        />
      )}

      {/* <NoDataList
        image={noUserList}
        text={"You don't have any user yet"}
        imageAlt={"no user list"}
      /> */}
    </>
  );
};

export default PropertiesComponent;
