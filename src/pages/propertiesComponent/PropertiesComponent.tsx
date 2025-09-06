import { useState } from "react";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import NoDataList from "../../components/noDataList/NoDataList";
import noUserList from "../../assets/icons/noUserList.svg";
import { Routing } from "../../utils/constants/routes.constants";

const PropertiesComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <SubHeaderOptions
        options={[
          "Static Properties Component",
          "Dynamic Properties Component",
        ]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        showBtn={true}
        btnText="+ Create Component"
        btnRoute={Routing.createStaticComponnet}
      />

      <NoDataList
        image={noUserList}
        text={"You don't have any user yet"}
        imageAlt={"no user list"}
      />
    </>
  );
};

export default PropertiesComponent;
