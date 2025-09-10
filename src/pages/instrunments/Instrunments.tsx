// import NoDataList from "../../components/noDataList/NoDataList";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import { Routing } from "../../utils/constants/routes.constants";
// import noUserList from "../../assets/icons/noUserList.svg";
import QueryAdded from "../../components/queryAdded/QueryAdded";
import InstrunmentCount from "../../components/instrunmentCount/InstrunmentCount";

const Instrunments = () => {
  const selectedTab = 0;

  const dummySetSelectedTab = () => {}; // no-op

  return (
    <>
      <SubHeaderOptions
        options={["Instruments"]}
        selectedTab={selectedTab}
        setSelectedTab={dummySetSelectedTab}
        showBtn={true}
        btnText="+ Create Instrument"
        btnRoute={Routing.createInstrument}
      />

      {/* <NoDataList
        image={noUserList}
        text={"You don't have any user yet"}
        imageAlt={"no user list"}
      /> */}

      <div style={{ padding: "10px" }}>
        <div className="instrunment-count-container">
          <InstrunmentCount />
          <InstrunmentCount />
          <InstrunmentCount />
        </div>
        <QueryAdded
          heading={"Instrument Name"}
          query={"Lorem Ipsum"}
          heading2={"Instrument Symbol"}
          instrunmentTotal={600}
        />
      </div>
    </>
  );
};

export default Instrunments;
