import "./TradingAccountDetail.css";
import { useState } from "react";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import SubFooter from "../../components/subFooter/SubFooter";
// import SearchBar from "../../components/searchBar/SearchBar";
// import UserAddedAccounts from "../../components/userAddedAccounts/UserAddedAccounts";
import { Constant } from "../../utils/constants/app.constants";
import { Routing } from "../../utils/constants/routes.constants";
import AccountsDetailTab from "../accountsDetailTab/AccountsDetailTab";
import LeverageTab from "../leverageTab/LeverageTab";

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
        {selectedTab === 0 && <AccountsDetailTab />}
        {selectedTab === 1 && <LeverageTab />}
      </div>
      <SubFooter
        btnText={
          selectedTab === 0 || selectedTab === 1
            ? Constant.Save
            : Constant.AddUser
        }
        backBtnText={Constant.Back}
        btnRoute={selectedTab === 0 ? Routing.home : Routing.tradingAccount}
      />
    </div>
  );
};

export default TradingAccountDetail;
