// import BackButton from "../backButton/BackButton";
import Button from "../button/Button";
import "./SubFooter.css";

interface SubFooterProps {
  btnText: string;
  backBtnText: string;
  btnRoute: string;
}
const SubFooter = ({ btnText, backBtnText, btnRoute }: SubFooterProps) => {
  return (
    <div className="subfooter-container">
      {/* <BackButton label={backBtnText} btn /> */}
      <Button
        label={backBtnText}
        btnRoute={btnRoute}
        bgColor="var(--secondary-btn-color)"
        textColor="var(--secondary-color)"
      />
      <Button label={btnText} btnRoute={btnRoute} />
    </div>
  );
};

export default SubFooter;
