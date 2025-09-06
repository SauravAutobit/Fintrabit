import "./CreateStaticComponnet.css";
import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import AddProperties from "../../components/addProperties/AddProperties";
import { Routing } from "../../utils/constants/routes.constants";

const CreateStaticComponnet = () => {
  const selectedTab = 0;

  const dummySetSelectedTab = () => {}; // no-op
  return (
    <>
      <SubHeaderOptions
        options={["Create Static Componnet"]}
        selectedTab={selectedTab}
        setSelectedTab={dummySetSelectedTab}
        showBtn={true}
        btnText="Create Component"
        btnRoute={Routing.propertiesComponent}
      />

      <div className="createStaticComponnet-container">
        <ComponentNameInput />
        <AddProperties />
      </div>
    </>
  );
};

export default CreateStaticComponnet;
