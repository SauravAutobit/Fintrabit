import "./CreateInstrument.css";
import SubFooter from "../../components/subFooter/SubFooter";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import FileUpload from "../../components/fileUpload/FileUpload";
import { useNavigate } from "react-router-dom";
import CustomTimePicker from "../../components/customTimePicker/CustomTimePicker";
// import CustomTimePicker from "../../components/customTimePicker/CustomTimePicker";

const CreateInstrument = () => {
  const [dropdownText, setDropdownText] = useState("Select EUR/EUR/etc");
  const [iconFile, setIconFile] = useState<string | null>(null);
  const [isCreateMode, setCreateMode] = useState(false);
  const [time, setTime] = useState("");

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  const navigate = useNavigate();
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

  console.log("iconFile", iconFile);
  const selectedTab = 0;
  const dummySetSelectedTab = () => {}; // no-op

  const handleCreate = () => {
    console.log("handlecreate");
    navigate("/instruments");
  };

  console.log(isCreateMode);

  return (
    <>
      <SubHeaderOptions
        options={["Create Instrument"]}
        selectedTab={selectedTab}
        setSelectedTab={dummySetSelectedTab}
      />

      <div className="tradingAccountDetail-scroll createInstrument-container">
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formUploadIcon">
            <Form.Label>Upload Icon</Form.Label>
            <FileUpload onFileSelect={(file) => setIconFile(file)} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formip">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
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
          {/* <Form.Group as={Col} md="6" controlId="formUserId">
            <Form.Label>Currency</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={dropdownText}
              className="dropDown-btn"
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
          </Form.Group> */}

          <Form.Group as={Col} md="6" controlId="formip">
            <Form.Label>Overnight Margin apply at</Form.Label>
            <CustomTimePicker value={time} onChange={handleTimeChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="formUserId">
            <Form.Label>Static Property</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={dropdownText}
              className="dropDown-btn"
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
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="formUserId">
            <Form.Label>Dynamic Property</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={dropdownText}
              className="dropDown-btn"
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
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="formUserId">
            <Form.Label>Select Day</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={dropdownText}
              className="dropDown-btn"
            >
              <Dropdown.Item
                href="#/action-1"
                onClick={() => setDropdownText("Action")}
              >
                Monday
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => setDropdownText("Another action")}
              >
                Tuesday
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setDropdownText("Something else")}
              >
                Wednesday
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setDropdownText("Something else")}
              >
                Thursday
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setDropdownText("Something else")}
              >
                Friday
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setDropdownText("Something else")}
              >
                Saturday
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setDropdownText("Something else")}
              >
                Sunday
              </Dropdown.Item>
            </DropdownButton>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="formip">
            <Form.Label>Start Timing</Form.Label>
            <CustomTimePicker value={time} onChange={handleTimeChange} />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="formip">
            <Form.Label>End Timing</Form.Label>
            <CustomTimePicker value={time} onChange={handleTimeChange} />
          </Form.Group>
        </Row>
      </div>
      <SubFooter
        saveBtnText={"Save"}
        backBtnText={"Back"}
        onBackClick={() => setCreateMode(false)}
        onSaveClick={handleCreate}
      />
    </>
  );
};

export default CreateInstrument;
// JJ
