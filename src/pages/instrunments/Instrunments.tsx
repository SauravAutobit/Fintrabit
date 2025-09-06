import NoDataList from "../../components/noDataList/NoDataList";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import { Routing } from "../../utils/constants/routes.constants";
import noUserList from "../../assets/icons/noUserList.svg";

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

      <NoDataList
        image={noUserList}
        text={"You don't have any user yet"}
        imageAlt={"no user list"}
      />
    </>
  );
};

export default Instrunments;
