import "./InstrunmentCount.css";
import greenTriangle from "../../assets/icons/greenTriangle.svg";

const InstrunmentCount = () => {
  return (
    <div className="instrunmentCount-container">
      <div className="instrunmentCount-heading mb-2">
        Total Static Instrument
      </div>
      <div className="instrunmentCount-count mb-2">1,985</div>
      <div className="instrunmentCount-growth mb-3">
        <img src={greenTriangle} alt="greenTriangle" />
        <span>14%</span>
        <p>last month</p>
      </div>
      <div className="instrunment-show">Show</div>
    </div>
  );
};

export default InstrunmentCount;
