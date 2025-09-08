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

  // Handle input change for new property form
  const handleInputChange = (name: string, value: string) => {
    setNewProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new property
  const addProperty = () => {
    // --- Static Type Validation ---
    if (indexNumber === 0) {
      if (
        newProperty.name.trim() === "" ||
        newProperty.dataType.trim() === ""
      ) {
        alert("Name and Data Type are required");
        return;
      }
    }
    // --- Dynamic Type Validation ---
    else if (indexNumber === 1) {
      // First, check the simple text fields
      if (
        newProperty.name.trim() === "" ||
        newProperty.dataType.trim() === "" ||
        newProperty.lengthType.trim() === ""
      ) {
        alert("Name, Data Type, and Length Type are required");
        return;
      }

      // Now, specifically validate the length
      const lengthValue = parseInt(newProperty.length);
      if (
        newProperty.length.trim() === "" ||
        isNaN(lengthValue) ||
        lengthValue < 1
      ) {
        alert("A valid Length (minimum 1) is required");
        return;
      }
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
    const allProperties = [...properties]; // Start with the properties already added

    // Check if the user has typed a property but not added it yet
    const isNewPropertyPartiallyFilled =
      newProperty.name.trim() !== "" ||
      newProperty.dataType.trim() !== "" ||
      newProperty.defaultValue.trim() !== "" ||
      newProperty.length.trim() !== "" ||
      newProperty.lengthType.trim() !== "";

    if (isNewPropertyPartiallyFilled) {
      // If they have, run the SAME strict validation as the 'addProperty' function
      if (indexNumber === 0) {
        if (
          newProperty.name.trim() === "" ||
          newProperty.dataType.trim() === ""
        ) {
          alert(
            "The property you are currently adding is incomplete. Please fill in Name and Data Type."
          );
          return;
        }
      } else if (indexNumber === 1) {
        const lengthValue = parseInt(newProperty.length);
        if (
          newProperty.name.trim() === "" ||
          newProperty.dataType.trim() === "" ||
          newProperty.lengthType.trim() === "" ||
          isNaN(lengthValue) ||
          lengthValue < 1
        ) {
          alert(
            "The property you are currently adding is incomplete. Please fill in Name, Data Type, Length Type, and a valid Length (minimum 1)."
          );
          return;
        }
      }
      // If the new property is valid, add it to our list for submission
      allProperties.push(newProperty);
    }

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
      target:
        indexNumber === 0
          ? "instrument/category/create"
          : "instrument/category/dinamic/create",
      session: "xyz",
      payload: {
        name: componentName.trim().toLowerCase(),
        type: indexNumber === 0 ? "static" : "dinamic",
        properties: allProperties.map((p) => ({
          key: p.name.trim().toLowerCase(),
          datatype: p.dataType.trim().toLowerCase(),
          default:
            p.defaultValue.trim() === ""
              ? "-"
              : p.defaultValue.trim().toLowerCase(),
          length: p.length.trim().toLowerCase(),
          length_type: p.lengthType.trim().toLowerCase(),
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
