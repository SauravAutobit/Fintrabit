import edit from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

interface EditDeleteProps {
  enableEdit: () => void;
}

const EditDelete = ({ enableEdit }: EditDeleteProps) => {
  return (
    <>
      <div className="queryDetails-btn-container">
        <div className="queryDetails-edit" onClick={enableEdit}>
          <img src={edit} alt="edit" />
          Edit
        </div>
        <div className="queryDetails-delete">
          Delete
          <img src={deleteIcon} alt="deleteIcon" width={14} height={16} />
        </div>
      </div>
    </>
  );
};

export default EditDelete;
