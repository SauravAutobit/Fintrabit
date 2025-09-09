import { useState, useEffect, useRef } from "react";
import "./CustomTimePicker.css";

// Helper hook to detect clicks outside an element
const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

interface CustomTimePickerProps {
  onChange: (time: string) => void;
  value: string;
}

const CustomTimePicker = ({ onChange, value }: CustomTimePickerProps) => {
  const initialHour = value ? value.split(":")[0] : "hh";
  const initialMinute = value ? value.split(":")[1] : "mm";

  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);

  const [isHourOpen, setHourOpen] = useState(false);
  const [isMinuteOpen, setMinuteOpen] = useState(false);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useOutsideAlerter(hourRef, () => setHourOpen(false));
  useOutsideAlerter(minuteRef, () => setMinuteOpen(false));

  useEffect(() => {
    if (hour !== "hh" && minute !== "mm") {
      onChange(`${hour}:${minute}`);
    }
  }, [hour, minute, onChange]);

  const hours = [...Array(24).keys()].map((h) => String(h).padStart(2, "0"));
  const minutes = [...Array(60).keys()].map((m) => String(m).padStart(2, "0"));

  return (
    <div className="custom-timepicker-container">
      {/* Hour Selector */}
      <div className="custom-select-wrapper" ref={hourRef}>
        <div
          className="custom-select-display"
          onClick={() => setHourOpen(!isHourOpen)}
        >
          {hour}
        </div>
        {isHourOpen && (
          <ul className="custom-select-options">
            {hours.map((h) => (
              <li
                key={h}
                onClick={() => {
                  setHour(h);
                  setHourOpen(false);
                }}
              >
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span className="separator">:</span>

      {/* Minute Selector */}
      <div className="custom-select-wrapper" ref={minuteRef}>
        <div
          className="custom-select-display"
          onClick={() => setMinuteOpen(!isMinuteOpen)}
        >
          {minute}
        </div>
        {isMinuteOpen && (
          <ul className="custom-select-options">
            {minutes.map((m) => (
              <li
                key={m}
                onClick={() => {
                  setMinute(m);
                  setMinuteOpen(false);
                }}
              >
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomTimePicker;
