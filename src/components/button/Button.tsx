import { Link } from "react-router-dom";
import "./Button.css";

interface ButtonProps {
  label: string;
  btnRoute?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  btnRoute,
  width = "181px",
  height = "41px",
  bgColor = "var(--primary-btn-color)",
  textColor = "var(--secondary-color)",
  onClick,
}: ButtonProps) => {
  const buttonStyles = {
    width,
    height,
    background: bgColor,
    color: textColor,
  };

  if (btnRoute) {
    return (
      <Link to={btnRoute}>
        <button className="btn-global" style={buttonStyles}>
          {label}
        </button>
      </Link>
    );
  }

  return (
    <button className="btn-global" style={buttonStyles} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
