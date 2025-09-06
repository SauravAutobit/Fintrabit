import Accordion from "react-bootstrap/Accordion";
import "./InstrunmentTable.css";

const InstrunmentTable = () => {
  return (
    <div className="tradingAccountDetail-instrunment">
      <div className="accordion-header-content">
        <span className="header-cell">Instrument Name</span>
        <span className="header-cell">Symbol</span>
        <span className="header-cell">Other Information shown here</span>
      </div>
      <Accordion>
        {Array.from({ length: 4 }).map((_, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              <div className="accordion-header-content">
                <span className="header-cell">Jane Cooper</span>
                <span className="header-cell">(207) 555-0119</span>
                <span className="header-cell">deanna.curtis@example.com</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>check</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default InstrunmentTable;
