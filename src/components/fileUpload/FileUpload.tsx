// src/components/fileUpload/FileUpload.tsx

import { useState, useRef, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./FileUpload.css";

// Import your icons
import upload from "../../assets/icons/upload.svg"; // Add your icon path
import close from "../../assets/icons/close.svg"; // Add your icon path

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"initial" | "uploading" | "completed">(
    "initial"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // This effect simulates the upload progress
  useEffect(() => {
    if (status === "uploading") {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setStatus("completed");
            if (file) {
              onFileSelect(file); // Notify parent component that upload is done
            }
            return 100;
          }
          return prev + 10;
        });
      }, 100); // Adjust speed of progress bar here
      return () => clearInterval(timer);
    }
  }, [status, file, onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setProgress(0);
      setStatus("uploading");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    setStatus("initial");
    onFileSelect(null); // Notify parent component that file was removed
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the input field
    }
  };

  const renderContent = () => {
    switch (status) {
      case "uploading":
        return (
          <div className="upload-state uploading">
            {/* <span>Uploading</span> */}
            {/* START OF CHANGE */}
            <div className="upload-progress-info">
              <span>Uploading</span>
              <span>{progress}%</span>
            </div>
            {/* END OF CHANGE */}
            <ProgressBar now={progress} />
          </div>
        );
      case "completed":
        return (
          <div className="upload-state completed">
            <span>{file?.name}</span>
            <button onClick={handleRemoveFile} className="remove-btn">
              <img src={close} alt="Remove" />
            </button>
          </div>
        );
      case "initial":
      default:
        return (
          <label className="upload-state initial">
            <img src={upload} alt="Upload" />
            <span>Select File to Upload</span>
            <input
              type="file"
              onChange={handleFileChange}
              ref={inputRef}
              style={{ display: "none" }}
            />
          </label>
        );
    }
  };

  return <div className="file-upload-container">{renderContent()}</div>;
};

export default FileUpload;
