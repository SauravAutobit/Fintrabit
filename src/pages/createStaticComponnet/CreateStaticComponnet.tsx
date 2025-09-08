import "./CreateStaticComponnet.css";
import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import AddProperties from "../../components/addProperties/AddProperties";
import { useEffect, useState } from "react";
import SubFooter from "../../components/subFooter/SubFooter";
import { addMessageListener, sendMessage } from "../../socket";

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
  const [lastRequestId, setLastRequestId] = useState<string | null>(null);

  const indexNumber = index;
  console.log("properties", properties);

  // Handle input change for new property form
  const handleInputChange = (name: string, value: string) => {
    setNewProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new property
  const addProperty = () => {
    if (
      indexNumber === 0 &&
      (newProperty.name.trim() === "" || newProperty.dataType.trim() === "")
    ) {
      alert("Name and Data Type are required");
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

    // Combine the existing properties list with the one currently being typed
    const allProperties = isNewPropertyFilled
      ? [...properties, newProperty]
      : [...properties];

    if (allProperties.length === 0) {
      alert("Please add at least one property.");
      return;
    }

    // 2. In handleCreate: store the new rid and send the message
    const newRid = crypto.randomUUID();
    setLastRequestId(newRid); // Store the ID so our listener can find it

    // 1. Gather all the data from your form states
    const message = {
      rid: newRid,
      target: "instrument/category/create",
      session: "xyz",
      payload: {
        name: componentName.trim().toLowerCase(),
        type: index === 0 ? "static" : "dynamic",
        properties: allProperties.map((p) => ({
          key: p.name.trim().toLowerCase(),
          datatype: p.dataType.trim().toLowerCase(),
          default:
            p.defaultValue.trim() === ""
              ? "-"
              : p.defaultValue.trim().toLowerCase(),
          length: p.length.trim().toLowerCase(),
          lengthType: p.lengthType.trim().toLowerCase(),
        })),
      },
    };

    console.log("Sending via WS:", message);
    sendMessage(message);
  };

  // 4. In useEffect: listen for the specific rid we just sent
  useEffect(() => {
    // Don't do anything if we haven't sent a request yet
    if (!lastRequestId) return;

    // Listen for responses
    const removeListener = addMessageListener((data) => {
      // Check if the response's rid matches the one we sent
      if (data.rid === lastRequestId && data.payload?.status === "success") {
        console.log("✅ Success response received:", data);
        onBack(); // Navigate back ONLY when the server confirms
      }
      // You could also add an 'else if' here to handle error responses
    });

    return removeListener; // Cleanup when the component unmounts
  }, [lastRequestId, onBack]); // Rerun this effect if we send a new request

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
          setProperties={setProperties}
          newProperty={newProperty}
          onHandleInputChange={handleInputChange} // Pass the handler down
          onAddProperty={addProperty} // Pass the add function down
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
