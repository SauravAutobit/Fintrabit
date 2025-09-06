import Button from "../button/Button";
import "./SubheaderOptions.css";

interface SubHeaderOptionsProps {
  options: string[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  showBtn?: boolean;
  btnText?: string;
  btnRoute?: string;
}
const SubHeaderOptions = ({
  options,
  selectedTab,
  setSelectedTab,
  showBtn = false,
  btnText,
  btnRoute,
}: SubHeaderOptionsProps) => {
  return (
    <div className="subHeaderOptions-container">
      <div className="subHeaderOptions-tabs">
        {options.map((option, index) => {
          return (
            <p
              key={index}
              onClick={() => setSelectedTab(index)}
              className={
                selectedTab === index
                  ? "subHeaderOptions-underline"
                  : "subHeaderOptions-notUnderline"
              }
            >
              {option}
            </p>
          );
        })}
      </div>
      {showBtn && btnText && btnRoute && (
        <Button label={btnText} btnRoute={btnRoute} />
      )}
    </div>
  );
};

export default SubHeaderOptions;
