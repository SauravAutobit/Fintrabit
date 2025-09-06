import "./CreateInstrument.css";
import SubFooter from "../../components/subFooter/SubFooter";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
// import { Routing } from "../../utils/constants/routes.constants";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import DropDown from "../../components/dropDown/DropDown";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import FileUpload from "../../components/fileUpload/FileUpload"; // Import the new component

const CreateInstrument = () => {
  const [dropdownText, setDropdownText] = useState("Select EUR/EUR/etc");
  const [iconFile, setIconFile] = useState<File | null>(null); // State to hold the uploaded file

  // const handleSave = async () => {
  //   // Create a FormData object to send the file and other data
  //   const formData = new FormData();

  //   // Append text data
  //   formData.append("tradingSymbol" /* value from another state */);
  //   formData.append("currency" /* value from another state */);

  //   // Here's where iconFile is used!
  //   if (iconFile) {
  //     formData.append("icon", iconFile, iconFile.name);
  //   }

  //   // Now you would send this formData to your server API
  //   // await fetch('/api/instruments', { method: 'POST', body: formData });

  //   console.log("This is the data that would be saved!");
  // };

  const selectedTab = 0;
  const dummySetSelectedTab = () => {}; // no-op

  return (
    <>
      <SubHeaderOptions
        options={["Create Instrument"]}
        selectedTab={selectedTab}
        setSelectedTab={dummySetSelectedTab}
        // showBtn={true}
        // btnText="+ Create Instrument"
        // btnRoute={Routing.propertiesComponent}
      />

      <div className="tradingAccountDetail-scroll createInstrument-container">
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formUploadIcon">
            <Form.Label>Upload Icon</Form.Label>
            <FileUpload onFileSelect={(file) => setIconFile(file)} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formip">
            <Form.Label>Trading Symbol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Trading Symbol"
              name="tradingSymbol"
              className={"detailsForm-input"}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formUserId">
            <Form.Label>Feeding Symbol</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Feeding Symbol"
              name="feedingSymbol"
              className={"detailsForm-input"}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formip">
            <Form.Label>Overnight Margin apply at</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Overnight Margin"
              name="overnightMargin"
              className={"detailsForm-input"}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formUserId">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Currency"
              name="currency"
              className={"detailsForm-input"}
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formip">
            <Form.Label>Timing</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Timing"
              name="timing"
              className={"detailsForm-input"}
            />
          </Form.Group>
        </Row>

        <div>Static Property</div>
        <DropdownButton
          id="dropdown-basic-button"
          title={dropdownText}
          className="dropDown-btn mt-2 mb-3"
        >
          <Dropdown.Item
            href="#/action-1"
            onClick={() => setDropdownText("Group 1")}
          >
            Group 1
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => setDropdownText("Group 2")}
          >
            Group 2
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => setDropdownText("Group 3")}
          >
            Group 3
          </Dropdown.Item>
        </DropdownButton>

        <div>Dynamic Property</div>
        <DropdownButton
          id="dropdown-basic-button"
          title={dropdownText}
          className="dropDown-btn mt-2 mb-3"
        >
          <Dropdown.Item
            href="#/action-1"
            onClick={() => setDropdownText("Action")}
          >
            Action
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => setDropdownText("Another action")}
          >
            Another action
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => setDropdownText("Something else")}
          >
            Something else
          </Dropdown.Item>
        </DropdownButton>

        <div>History Type</div>
        <DropdownButton
          id="dropdown-basic-button"
          title={dropdownText}
          className="dropDown-btn mt-2 mb-3"
        >
          <Dropdown.Item
            href="#/action-1"
            onClick={() => setDropdownText("Action")}
          >
            Action
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => setDropdownText("Another action")}
          >
            Another action
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => setDropdownText("Something else")}
          >
            Something else
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <SubFooter btnText={"Save"} backBtnText={"Back"} btnRoute={""} />
    </>
  );
};

export default CreateInstrument;
