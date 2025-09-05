import "./TradingAccountDetail.css";
import { useState } from "react";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import DetailsForm from "../../components/detailsForm/DetailsForm";
import SubFooter from "../../components/subFooter/SubFooter";
import ToggleButton from "../../components/toggleButton/ToggleButton";
import DropDown from "../../components/dropDown/DropDown";
import Checkbox from "../../components/checkbox/Checkbox";
// import SearchBar from "../../components/searchBar/SearchBar";
// import UserAddedAccounts from "../../components/userAddedAccounts/UserAddedAccounts";
import QueryBar from "../../components/queryBar/QueryBar";
import { Constant } from "../../utils/constants/app.constants";
import { Routing } from "../../utils/constants/routes.constants";

const TradingAccountDetail = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <SubHeaderOptions
        options={[
          "Accounts Detail",
          "Leverage",
          "Chargers",
          "Instrument Field",
          "Add user (Existing)",
        ]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="tradingAccountDetail-scroll">
        {selectedTab === 0 ? (
          <>
            <DetailsForm />
            <div className="tradingAccountDetail-toggle-container">
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
            <div className="tradingAccountDetail-dropdown-container">
              <DropDown />
              <DropDown />
              <DropDown />
              <DropDown />
              <DropDown />
              <DropDown />
            </div>
            <div className="tradingAccountDetail-checkbox-container">
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
          <div className="tradingAccountDetail-query">
            <QueryBar
              name={Constant.LeverageName}
              value={Constant.LeverageValue}
              type={Constant.LeverageType}
            />
          </div>
        )}
      </div>
      <SubFooter
        btnText={selectedTab === 0 ? Constant.Save : Constant.AddUser}
        backBtnText={Constant.Back}
        btnRoute={selectedTab === 0 ? Routing.home : Routing.tradingAccount}
      />
    </div>
  );
};

export default TradingAccountDetail;
