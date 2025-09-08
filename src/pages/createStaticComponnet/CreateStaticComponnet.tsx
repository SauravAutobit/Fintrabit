import "./CreateStaticComponnet.css";
import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import AddProperties from "../../components/addProperties/AddProperties";
import { useState } from "react";
import SubFooter from "../../components/subFooter/SubFooter";
import { sendMessage } from "../../socket";

interface CreateStaticComponnetProps {
  index: number;
  onBack: () => void;
}

interface Property {
  name: string;
  defaultValue: string;
  dataType: string;
  length: string;
  lengthType: string;
}

const CreateStaticComponnet = ({
  index,
  onBack,
}: CreateStaticComponnetProps) => {
  const [componentName, setComponentName] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState<Property>({
    name: "",
    defaultValue: "",
    dataType: "",
    length: "",
    lengthType: "",
  });

  const indexNumber = index;
  console.log("properties", properties);

  // Handle input change for new property form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  // Handle adding a new property
  const addProperty = () => {
    if (
      indexNumber === 0 &&
      (newProperty.name.trim() === "" ||
        newProperty.dataType.trim() === "" ||
        newProperty.defaultValue.trim() === "")
    ) {
      alert("Name, Default Vlaue and Data Type are required");
      return;
    } else if (
      indexNumber === 1 &&
      (newProperty.name.trim() === "" ||
        newProperty.dataType.trim() === "" ||
        newProperty.length.trim() === "" ||
        newProperty.lengthType.trim() === "")
    ) {
      alert("Name, Length, Data Type and Length Type are required");
      return;
    }
    setProperties([...properties, newProperty]);
    setNewProperty({
      name: "",
      defaultValue: "",
      dataType: "",
      length: "",
      lengthType: "",
    }); // Reset the form
  };

  const handleCreate = () => {
    // Validation can also be done here now
    if (componentName.trim() === "") {
      alert("Component Name is required.");
      return;
    }

    // Check if the user has typed a property but not added it yet
    const isNewPropertyFilled =
      newProperty.name.trim() !== "" && newProperty.dataType.trim() !== "";

    console.log("isNewPropertyFilled", isNewPropertyFilled);
    // Combine the existing properties list with the one currently being typed
    const allProperties = isNewPropertyFilled
      ? [...properties, newProperty]
      : [...properties];

    console.log("allProperties", allProperties);

    if (allProperties.length === 0) {
      alert("Please add at least one property.");
      return;
    }

    // 1. Gather all the data from your form states
    const message = {
      rid: "sjdd",
      target: "instrument/category/create",
      session: "xyz",
      payload: {
        name: componentName.trim().toLowerCase(),
        type: index === 0 ? "static" : "dynamic",
        properties: allProperties.map((p) => ({
          key: p.name.trim().toLowerCase(),
          datatype: p.dataType.trim().toLowerCase(),
          default: p.defaultValue.trim().toLowerCase(),
          length: p.length.trim().toLowerCase(),
          lengthType: p.lengthType.trim().toLowerCase(),
        })),
      },
    };

    console.log("Sending via WS:", message);
    sendMessage(message);

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
        selectedTab={0}
        setSelectedTab={() => {}}
      />

      <div className="tradingAccountDetail-scroll createStaticComponnet-container">
        <ComponentNameInput
          componentName={componentName}
          setComponentName={setComponentName}
        />
        <AddProperties
          indexNumber={index}
          properties={properties}
          newProperty={newProperty}
          handleInputChange={handleInputChange} // Pass the handler down
          addProperty={addProperty} // Pass the add function down
          setProperties={setProperties}
        />
      </div>

      <SubFooter
        saveBtnText={"Create"}
        backBtnText={"Back"}
        onSaveClick={handleCreate}
        onBackClick={onBack}
      />
    </>
  );
};

export default CreateStaticComponnet;
