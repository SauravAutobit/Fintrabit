import edit from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import "../queryDetails/QueryDetails.css";

interface EditDeleteProps {
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  isEditing: boolean;
}

const EditDelete = ({
  onEdit,
  onDelete,
  onSave,
  isEditing,
}: EditDeleteProps) => {
  return (
    <>
      <div className="queryDetails-btn-container">
        {isEditing ? (
          // Show a "Save" button when in edit mode
          <div className="queryDetails-edit" onClick={onSave}>
            {/* <img src={saveIcon} alt="save" /> */}
            Save
          </div>
        ) : (
          // Show the "Edit" button when not in edit mode
          <div className="queryDetails-edit" onClick={onEdit}>
            <img src={edit} alt="edit" />
            Edit
          </div>
        )}
        <div className="queryDetails-delete" onClick={onDelete}>
          Delete
          <img src={deleteIcon} alt="deleteIcon" width={14} height={16} />
        </div>
      </div>
    </>
  );
};

export default EditDelete;
