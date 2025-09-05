import "./ToggleButton.css";

const ToggleButton = () => {
  return (
    <div className="toggleButton-container">
      <p>Toggle</p>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
