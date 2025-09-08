import Button from "../button/Button";
import "./SubFooter.css";

interface SubFooterProps {
  saveBtnText: string;
  backBtnText: string;
  onSaveClick: () => void;
  onBackClick: () => void;
}
const SubFooter = ({
  saveBtnText,
  backBtnText,
  onSaveClick,
  onBackClick,
}: SubFooterProps) => {
  return (
    <div className="subfooter-container">
      <Button
        label={backBtnText}
        onClick={onBackClick}
        bgColor="var(--secondary-btn-color)"
        textColor="var(--secondary-color)"
      />

      <Button label={saveBtnText} onClick={onSaveClick} />
    </div>
  );
};

export default SubFooter;
