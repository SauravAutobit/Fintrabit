import "./UserDetail.css";
import DetailsForm from "../../components/detailsForm/DetailsForm";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
// import SubFooter from "../../components/subFooter/SubFooter";
import ToggleButton from "../../components/toggleButton/ToggleButton";
import DropDown from "../../components/dropDown/DropDown";
import Checkbox from "../../components/checkbox/Checkbox";
import { useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import UserAddedAccounts from "../../components/userAddedAccounts/UserAddedAccounts";
// import { Constant } from "../../utils/constants/app.constants";
// import { Routing } from "../../utils/constants/routes.constants";

const UserDetail = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="user-details-container">
      <SubHeaderOptions
        options={["User Details", "Add Existing Accounts"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="userDetail-scroll">
        {selectedTab === 0 ? (
          <>
            {" "}
            <DetailsForm />
            <div className="userDetail-toggle-container">
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
              <ToggleButton />
            </div>
            <div className="userDetail-dropdown-container">
              <DropDown />
              <DropDown />
              <DropDown />
              <DropDown />
              <DropDown />
              <DropDown />
            </div>
            <div className="userDetail-checkbox-container">
              <Checkbox id={"custom-checkbox1"} />
              <Checkbox id={"custom-checkbox2"} />
              <Checkbox id={"custom-checkbox3"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
              <Checkbox id={"custom-checkbox4"} />
            </div>
          </>
        ) : (
          <div className="userDetail-existingAccounts">
            <SearchBar
              heading={"Account Number"}
              placeholder={"Search Account Number"}
            />
            <UserAddedAccounts
              heading={"Added Accounts"}
              accountNumber={"XXXXXXXXXX5896"}
            />
          </div>
        )}
      </div>
      {/* <SubFooter
        // btnText={selectedTab === 0 ? Constant.Save : Constant.AddUser}
        backBtnText={Constant.Back}
        btnRoute={selectedTab === 0 ? Routing.home : Routing.tradingAccount}
      /> */}
    </div>
  );
};

export default UserDetail;
