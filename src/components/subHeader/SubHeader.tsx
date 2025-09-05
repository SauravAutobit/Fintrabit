import "./SubHeader.css";
import Button from "../button/Button";

interface SubHeaderProps {
  headingName: string;
  btnText: string;
  btnRoute: string;
}

const SubHeader = ({ headingName, btnText, btnRoute }: SubHeaderProps) => {
  return (
    <div className="subheader-container">
      <div style={{ fontWeight: 500 }}>{headingName}</div>
      <Button label={btnText} btnRoute={btnRoute} />
    </div>
  );
};

export default SubHeader;
