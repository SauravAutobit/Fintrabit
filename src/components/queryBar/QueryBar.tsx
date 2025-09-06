import SearchBar from "../searchBar/SearchBar";
import "./QueryBar.css";
import Form from "react-bootstrap/Form";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useState } from "react";
import Button from "../button/Button";
import { Constant } from "../../utils/constants/app.constants";

interface QueryBarProps {
  name: string;
  value: string;
  type: string;
  placeholder?: string;
}

interface Leverage {
  name: string;
  value: string;
  type: string;
}

const QueryBar = ({ name, value, type, placeholder }: QueryBarProps) => {
  // Keep an array of leverages
  const [leverages, setLeverages] = useState<Leverage[]>([
    { name: "", value: "", type: "" }, // default first one
  ]);

  const handleChange = (
    index: number,
    field: keyof Leverage,
    newValue: string
  ) => {
    setLeverages((prev) =>
      prev.map((lev, i) => (i === index ? { ...lev, [field]: newValue } : lev))
    );
  };

  const handleDelete = (index: number) => {
    if (index === 0) {
      // Just reset values for the first row
      setLeverages((prev) =>
        prev.map((lev, i) =>
          i === 0 ? { name: "", value: "", type: "" } : lev
        )
      );
    } else {
      // Remove the row normally
      setLeverages((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const handleAdd = () => {
    setLeverages((prev) => [
      ...prev,
      { name: "", value: "", type: "" }, // new empty leverage
    ]);
  };

  return (
    <div className="queryBar-container">
      <SearchBar heading={"Query"} placeholder={"Search Query"} />
      <div className="queryBar-options">
        {leverages.map((lev, index) => (
          <div key={index} className="queryBar-input-icons">
            <div className="queryBar-inputs-container">
              <div className="queryBar-input-option">
                {index === 0 && <div style={{ fontWeight: 500 }}>{name}</div>}{" "}
                <Form className="d-flex queryBar-input-icon">
                  <Form.Control
                    type="text"
                    placeholder={placeholder}
                    className="queryBar-input"
                    value={lev.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </Form>
              </div>
              <div className="queryBar-input-option">
                {index === 0 && <div style={{ fontWeight: 500 }}>{value}</div>}
                <Form className="d-flex queryBar-input-icon">
                  <Form.Control
                    type="text"
                    placeholder={placeholder}
                    className="queryBar-input"
                    value={lev.value}
                    onChange={(e) =>
                      handleChange(index, "value", e.target.value)
                    }
                  />
                </Form>
              </div>
              <div className="queryBar-input-option">
                {index === 0 && <div style={{ fontWeight: 500 }}>{type}</div>}
                <Form className="d-flex queryBar-input-icon">
                  <Form.Control
                    type="text"
                    placeholder={placeholder}
                    className="queryBar-input"
                    value={lev.type}
                    onChange={(e) =>
                      handleChange(index, "type", e.target.value)
                    }
                  />
                </Form>
              </div>
            </div>

            <div
              className="queryBar-delete-icon"
              onClick={() => handleDelete(index)}
              style={{ cursor: index === 0 ? "not-allowed" : "pointer" }}
            >
              <img
                src={deleteIcon}
                width="14px"
                className="sidebar-side-icon"
              />
            </div>
          </div>
        ))}

        <div className="queryBar-addMore" onClick={handleAdd}>
          + Add more {name.split(" ")[0]}
        </div>
      </div>
      <div className="queryBar-Add-button">
        <Button label={Constant.Add} btnRoute={""} />
      </div>
    </div>
  );
};

export default QueryBar;
