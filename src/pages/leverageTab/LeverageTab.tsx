import QueryBar from "../../components/queryBar/QueryBar";
import { Constant } from "../../utils/constants/app.constants";
import QueryAdded from "../../components/queryAdded/QueryAdded";
import { useState } from "react";
// import QueryDetails from "../../components/queryDetails/QueryDetails";
import backArrow from "../../assets/icons/backArrow.svg";

const LeverageTab = () => {
  const [view, setView] = useState<
    "list" | "details" | "remaining" | "remainingDetails"
  >("list");

  return (
    <div className="tradingAccountDetail-query">
      {view === "list" && (
        <>
          <QueryBar
            name={Constant.LeverageName}
            value={Constant.LeverageValue}
            type={Constant.LeverageType}
          />
          <QueryAdded
            heading={"Query"}
            query={"Instrument  [trading_symbol=’banknifty’]"}
            heading2={"Instrument Targeted"}
            instrunmentTotal={600}
            onEdit={() => setView("details")}
          />
          <div
            className="queryAdded-remaining"
            onClick={() => setView("remaining")}
          >
            Show Remaining Instrument
          </div>
        </>
      )}

      {view === "details" &&
        "dummys"
        // <QueryDetails
        //   onBack={() => setView("list")}
        //   section={"Query Details"}
        //   name={"Query Name :"}
        //   nameValue={"Instrument [trading_symbol=’banknifty’]"}
        //   total={"Instrument Targeted :"}
        //   totalValue={600}
        // />
      }
      {view === "remaining" && (
        <>
          <div className="queryDetails-nav" onClick={() => setView("list")}>
            <img src={backArrow} alt="backArrow" width={11.78} height={20} />
            <div className="queryDetails-nav-text">Remaining Instrument</div>
          </div>

          <QueryAdded
            heading={"Instrument Name"}
            query={"EUR/USD"}
            heading2={"Symbol Code"}
            instrunmentTotal={600}
            onEdit={() => setView("remainingDetails")}
          />
        </>
      )}

      {view === "remainingDetails" &&
        "dummys"
        // <QueryDetails
        //   onBack={() => setView("list")}
        //   section={"Remaining Instrument"}
        //   name={"Instrument Name :"}
        //   nameValue={"EUR/USD"}
        //   total={"Symbol Code :"}
        //   totalValue={600}
        // />
      }
    </div>
  );
};

export default LeverageTab;
