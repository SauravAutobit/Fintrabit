import SearchBar from "../searchBar/SearchBar";
import "./QueryBar.css";
import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

interface QueryBarProps {
  name: string;
  value: string;
  type: string;
  placeholder?: string;
}
const QueryBar = ({ name, value, type, placeholder }: QueryBarProps) => {
  return (
    <div className="queryBar-container">
      <SearchBar heading={"Query"} placeholder={"Search Query"} />
      <div className="queryBar-options">
        <div className="queryBar-input-option">
          <div style={{ fontWeight: 500 }}>{name}</div>
          <Form className="d-flex queryBar-input-icon">
            <Form.Control
              type="text"
              placeholder={placeholder}
              className="queryBar-input"
            />
          </Form>
        </div>

        <div className="queryBar-input-option">
          <div style={{ fontWeight: 500 }}>{value}</div>
          <Form className="d-flex queryBar-input-icon">
            <Form.Control
              type="text"
              placeholder={placeholder}
              className="queryBar-input"
            />
          </Form>
        </div>
        <div className="queryBar-input-option">
          <div style={{ fontWeight: 500 }}>{type}</div>
          <Form className="d-flex queryBar-input-icon">
            <Form.Control
              type="text"
              placeholder={placeholder}
              className="queryBar-input"
            />
          </Form>
        </div>
        <div className="queryBar-input-icons">
          <div className="queryBar-inputs-container">
            <div className="queryBar-input-option">
              <Form className="d-flex queryBar-input-icon">
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  className="queryBar-input"
                />
              </Form>
            </div>
            <div className="queryBar-input-option">
              <Form className="d-flex queryBar-input-icon">
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  className="queryBar-input"
                />
              </Form>
            </div>
            <div className="queryBar-input-option">
              <Form className="d-flex queryBar-input-icon">
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  className="queryBar-input"
                />
              </Form>
            </div>
          </div>

          <div className="queryBar-delete-icon">
            <img src={deleteIcon} width="14px" className="sidebar-side-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryBar;
