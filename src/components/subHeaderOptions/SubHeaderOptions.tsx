import Button from "../button/Button";
import "./SubHeaderOptions.css";

interface SubHeaderOptionsProps {
  options: string[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  showBtn?: boolean;
  btnText?: string;
  btnRoute?: string;
  onClick?: () => void;
}
const SubHeaderOptions = ({
  options,
  selectedTab,
  setSelectedTab,
  showBtn = false,
  btnText,
  btnRoute,
  onClick,
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
      {showBtn && btnText && btnRoute ? (
        <Button label={btnText} btnRoute={btnRoute} />
      ) : (
        showBtn &&
        btnText &&
        onClick && <Button label={btnText} onClick={onClick} />
      )}
    </div>
  );
};

export default SubHeaderOptions;
