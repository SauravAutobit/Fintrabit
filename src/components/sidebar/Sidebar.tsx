import "./Sidebar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import backArrow from "../../assets/icons/backArrow.svg";
import sidebarIcon from "../../assets/icons/sidebarIcon.svg";
import rightArrow from "../../assets/icons/rightArrow.svg";
import Collapse from "react-bootstrap/Collapse";
import downArrow from "../../assets/icons/downArrow.svg";
import { Link } from "react-router-dom";
import { sidebarOptions } from "../../utils/constants/sidebar.constants";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const [show, setShow] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleShow = () => {
    setShow(!show);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sideBarHandler = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="sidebar-container">
        <div className={show ? "sidebar-icons-hide" : "sidebar-icons"}>
          <Button className="sidebar-btn" onClick={handleShow}>
            <img
              src={show ? backArrow : rightArrow}
              width="6.87px"
              height="11.67px"
            />
          </Button>
          {Array.from({ length: 7 }).map((_, index) => (
            <img
              key={index}
              src={sidebarIcon}
              width="24px"
              className="sidebar-side-icon"
              onClick={handleShow}
            />
          ))}
        </div>
        <Offcanvas
          show={show}
          backdrop={false}
          scroll={true}
          className="sidebar-offcanvas"
        >
          <Offcanvas.Body className="sidebar-offcanvas-slider">
            <div className="sidebar-icons">
              <Button className="sidebar-btn" onClick={handleShow}>
                <img
                  src={show ? backArrow : rightArrow}
                  width="6.87px"
                  height="11.67px"
                />
              </Button>
              {sidebarOptions.map((option, index) => {
                return (
                  <div key={index}>
                    <div
                      className="sidebar-options-container"
                      onClick={() => sideBarHandler(index)}
                    >
                      <div className="sidebar-icon-name">
                        <img
                          src={sidebarIcon}
                          width={"24px"}
                          className="sidebar-side-icon"
                          onClick={handleShow}
                        />
                        <p className="sidebar-options">{option.title}</p>
                      </div>
                      <img
                        src={openIndex === index ? downArrow : rightArrow}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Collapse in={openIndex === index}>
                      <div id="example-collapse-text">
                        <ul>
                          {option.children.map((child, index) => {
                            return (
                              <Link
                                key={index}
                                to={child.link}
                                onClick={() => setActiveIndex(index)}
                              >
                                <li
                                  className={`sidebar-subOptions ${
                                    activeIndex === index ? "after" : ""
                                  }`}
                                >
                                  {child.name}
                                </li>
                              </Link>
                            );
                          })}{" "}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                );
              })}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Sidebar;
