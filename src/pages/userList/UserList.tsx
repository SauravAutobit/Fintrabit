import SubHeader from "../../components/subHeader/SubHeader";
import { Constant } from "../../utils/constants/app.constants";
import { Routing } from "../../utils/constants/routes.constants";
import UserAdded from "../../components/userAdded/UserAdded";
import NoDataList from "../../components/noDataList/NoDataList";
import noUserList from "../../assets/icons/noUserList.svg";

const userArray = [
  {
    name: "Jane Cooper",
    phone: "(207) 555-0119",
    email: "deanna.curtis@example.com",
  },
  {
    name: "Jane Cooper",
    phone: "(207) 555-0119",
    email: "deanna.curtis@example.com",
  },
  {
    name: "Jane Cooper",
    phone: "(207) 555-0119",
    email: "deanna.curtis@example.com",
  },
];

const UserList = () => {
  return (
    <>
      <SubHeader
        headingName={Constant.UserList}
        btnText={"Add User"}
        btnRoute={Routing.userDetail}
      />
      {userArray.length === 0 && (
        <NoDataList
          image={noUserList}
          text={"You don't have any user yet"}
          imageAlt={"no user list"}
        />
      )}
      {userArray.map((user, index) => (
        <UserAdded
          key={index}
          name={user.name}
          phone={user.phone}
          email={user.email}
        />
      ))}
    </>
  );
};

export default UserList;
