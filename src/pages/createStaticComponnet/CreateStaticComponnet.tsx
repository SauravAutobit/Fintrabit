import "./CreateStaticComponnet.css";
import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import AddProperties from "../../components/addProperties/AddProperties";
// import { Routing } from "../../utils/constants/routes.constants";

interface CreateStaticComponnetProps {
  index: number;
  onClick?: () => void;
}
const CreateStaticComponnet = ({
  index,
  onClick,
}: CreateStaticComponnetProps) => {
  const selectedTab = 0;
  const dummySetSelectedTab = () => {}; // no-op

  const indexNumber = index;
  return (
    <>
      <SubHeaderOptions
        options={
          indexNumber === 0
            ? ["Create Static Componnet"]
            : ["Create Dynamic Componnet"]
        }
        selectedTab={selectedTab}
        setSelectedTab={dummySetSelectedTab}
        showBtn={true}
        btnText="Create Component"
        onClick={onClick}
        // btnRoute={Routing.propertiesComponent}
      />

      <div className="createStaticComponnet-container">
        <ComponentNameInput />
        <AddProperties />
      </div>
    </>
  );
};

export default CreateStaticComponnet;
