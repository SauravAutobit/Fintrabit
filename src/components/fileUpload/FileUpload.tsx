// src/components/fileUpload/FileUpload.tsx

import { useState, useRef, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./FileUpload.css";

// Import your icons
import upload from "../../assets/icons/upload.svg"; // Add your icon path
import close from "../../assets/icons/close.svg"; // Add your icon path

interface FileUploadProps {
  onFileSelect: (base64: string | null) => void;
}

// --- Configuration for Validation ---
const MAX_FILE_SIZE_KB = 5; // Max size: 50 Kilobytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"initial" | "uploading" | "completed">(
    "initial"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // This effect simulates the upload progress
  useEffect(() => {
    if (status === "uploading" && file) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setStatus("completed");

            // --- CONVERT TO BASE64 ON COMPLETION ---
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64String = reader.result as string;
              onFileSelect(base64String); // Notify parent with the Base64 string
            };
            reader.onerror = (error) => {
              console.error("Error converting file to Base64:", error);
              onFileSelect(null);
            };
            // --- END OF CONVERSION LOGIC ---

            return 100;
          }
          return prev + 10;
        });
      }, 100); // Adjust speed of progress bar here
      return () => clearInterval(timer);
    }
  }, [status, file, onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // --- VALIDATION LOGIC ---
      // 1. Check File Type
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        alert(`Invalid file type. Please select a PNG, JPG, WEBP, or SVG.`);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      // 2. Check File Size
      const fileSizeKB = selectedFile.size / 1024;
      if (fileSizeKB > MAX_FILE_SIZE_KB) {
        alert(
          `File is too large. Please select a file smaller than ${MAX_FILE_SIZE_KB} KB.`
        );
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      // --- END OF VALIDATION ---

      // If validation passes, start the upload process
      setFile(selectedFile);
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
              accept={ALLOWED_FILE_TYPES.join(",")} // Pre-filter files for the user
            />
          </label>
        );
    }
  };

  return <div className="file-upload-container">{renderContent()}</div>;
};

export default FileUpload;
