import NoDataList from "../../components/noDataList/NoDataList";
import SubHeader from "../../components/subHeader/SubHeader";
import noTradingAccount from "../../assets/icons/noTradingAccount.svg";

const TradingAccountList = () => {
  return (
    <div>
      <SubHeader
        headingName={"Account List"}
        btnText={"Add Account"}
        btnRoute={"/trading-account-detail"}
      />
      <NoDataList
        image={noTradingAccount}
        imageAlt={"no trading account"}
        text={"You don't have any Account yet"}
      />
    </div>
  );
};

export default TradingAccountList;
