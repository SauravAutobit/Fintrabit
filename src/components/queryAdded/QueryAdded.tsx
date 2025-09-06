import rightArrow from "../../assets/icons/rightArrow.svg";
import "./QueryAdded.css";

interface QueryAddedProps {
  heading: string;
  query: string;
  heading2: string;
  instrunmentTotal: number;
  onEdit?: () => void;
}

const QueryAdded = ({
  heading,
  query,
  heading2,
  instrunmentTotal,
  onEdit,
}: QueryAddedProps) => {
  return (
    <>
      <div className="queryAdded-container">
        <div className="querybar-heading-wrapper">
          <div className="query-heading">{heading}</div>
          <div className="query-heading">{heading2}</div>
        </div>

        <div className="queryAdded-info" onClick={onEdit}>
          <div className="queryAdded-query-info">
            <div className="query-value">{query}</div>
            <div className="query-value">{instrunmentTotal}</div>
          </div>
          <img src={rightArrow} width="11.78px" height="20px" />
        </div>
      </div>
    </>
  );
};

export default QueryAdded;
