import "./UserAdded.css";
import rightArrow from "../../assets/icons/rightArrow.svg";

interface UserAddedProps {
  name: string;
  phone: string;
  email: string;
}

const UserAdded = ({ name, phone, email }: UserAddedProps) => {
  return (
    <div className="userAdded-container">
      <div className="userAdded-info">
        <p>{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      <img src={rightArrow} width="11.78px" height="20px" />
    </div>
  );
};

export default UserAdded;
