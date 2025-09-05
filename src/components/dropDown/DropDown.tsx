import { useState } from "react";
import "./DropDown.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropDown = () => {
  const [dropdownText, setDropdownText] = useState("Select EUR/EUR/etc");
  return (
    <div className="dropDown-container">
      <p style={{ fontWeight: 500 }}>Dropdown Name</p>
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
    </div>
  );
};

export default DropDown;
