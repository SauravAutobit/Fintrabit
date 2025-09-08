import "./CreateStaticComponnet.css";
import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import AddProperties from "../../components/addProperties/AddProperties";
import { useState } from "react";
import SubFooter from "../../components/subFooter/SubFooter";
// import { Routing } from "../../utils/constants/routes.constants";

interface CreateStaticComponnetProps {
  index: number;
  onBack: () => void; // Renamed for clarity
}
const CreateStaticComponnet = ({
  index,
  onBack,
}: CreateStaticComponnetProps) => {
  const [propertyName, setPropertyName] = useState("");
  const selectedTab = 0;
  const dummySetSelectedTab = () => {}; // no-op

  const indexNumber = index;

  const handleCreate = () => {
    // 1. Gather all the data from your form states
    const payload = {
      type: index === 0 ? "static" : "dynamic",
      name: propertyName,
      // ... other properties
    };

    console.log("Sending payload via WebSocket:", payload);
    // 2. Send the data via WebSocket
    // yourWebSocket.send(JSON.stringify(payload));

    // 3. Listen for a success message from the socket, and THEN navigate back.
    // For this example, we'll simulate success immediately.
    console.log("Success! Navigating back.");
    onBack(); // This triggers setClicked(false) in the parent
  };

  return (
    <>
      <SubHeaderOptions
        options={
          indexNumber === 0
            ? ["Create Static Componnet"]
            : ["Create Dynamic Group"]
        }
        selectedTab={selectedTab}
        setSelectedTab={dummySetSelectedTab}
        // showBtn={true}
        // btnText="Create Component"
        // onClick={onClick}
        // btnRoute={Routing.propertiesComponent}
      />

      <div className="tradingAccountDetail-scroll createStaticComponnet-container">
        <ComponentNameInput
          propertyName={propertyName}
          setPropertyName={setPropertyName}
        />
        <AddProperties indexNumber={index} propertyName={propertyName} />
      </div>

      <SubFooter
        saveBtnText={"Create"}
        backBtnText={"Back"}
        onSaveClick={handleCreate} // The Create button triggers the save logic
        onBackClick={onBack} // The Back button simply navigates
      />
    </>
  );
};

export default CreateStaticComponnet;
