import SubHeader from "../../components/subHeader/SubHeader";
import { Constant } from "../../utils/constants/app.constants";
import { Routing } from "../../utils/constants/routes.constants";
import UserAdded from "../../components/userAdded/UserAdded";
// import NoDataList from "../../components/noDataList/NoDataList";
// import noUserList from "../../assets/icons/noUserList.svg";

const UserList = () => {
  return (
    <>
      <SubHeader
        headingName={Constant.UserList}
        btnText={"Add User"}
        btnRoute={Routing.userDetail}
      />
      {/* <NoDataList
        image={noUserList}
        text={"You don't have any user yet"}
        imageAlt={"no user list"}
      /> */}
      <UserAdded
        name={"Jane Cooper"}
        phone={"(207) 555-0119"}
        email={"deanna.curtis@example.com"}
      />
      <UserAdded
        name={"Jane Cooper"}
        phone={"(207) 555-0119"}
        email={"deanna.curtis@example.com"}
      />
      <UserAdded
        name={"Jane Cooper"}
        phone={"(207) 555-0119"}
        email={"deanna.curtis@example.com"}
      />
    </>
  );
};

export default UserList;
