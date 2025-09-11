import "./CreateStaticComponnet.css";
import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import AddProperties from "../../components/addProperties/AddProperties";
import { useState } from "react";
import SubFooter from "../../components/subFooter/SubFooter";
// import { addMessageListener, sendMessage } from "../../socket";

import { apiClient } from "../../services/socketService"; // Import the client
import { useDispatch } from "react-redux";
import {
  addComponent,
  type ComponentData,
} from "../../store/slices/componentsSlice";
// import type { ComponentData } from "../../store/slices/componentsSlice";

// interface CreateResponse {
//   id: string;
//   name: string;
//   // ... any other fields the server returns upon creation
// }

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
  // by socket.ts
  // const [lastRequestId, setLastRequestId] = useState<string | null>(null);

  const indexNumber = index;
  const dispatch = useDispatch(); // ✅ Get the dispatch function

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

  const handleCreate = async () => {
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

    // 1. Construct the message payload (WITHOUT rid)
    const payload = {
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
    };

    const target =
      indexNumber === 0
        ? "instrument/category/create"
        : "instrument/category/dinamic/create";

    // 2. Send and wait for the response in a try/catch block
    try {
      // The response type <any> can be replaced with a more specific interface
      const response = await apiClient.send<ComponentData>(target, payload);

      if (response.data) {
        console.log(
          "✅ Component created successfully:",
          response.data,
          typeof response.data
        );
        // ✅ Dispatch the action to add the new component to the Redux store

        const obj: ComponentData = {
          ...payload,
          id: JSON.stringify(response.data),
          type: indexNumber === 0 ? "static" : "dinamic", // Ensure correct type
        };
        dispatch(addComponent(obj));
        onBack(); // Navigate back
      } else {
        throw new Error("No component data returned from server.");
      }
    } catch (error: unknown) {
      console.error("❌ Failed to create component:", error);

      // This is how you safely access properties on an 'unknown' error
      let errorMessage = "An unknown error occurred.";
      if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }
      alert(`Error: ${errorMessage}`);
    }
  };

  //by socket.ts
  // const handleCreate = () => {
  //   // Validation can also be done here now
  //   if (componentName.trim() === "") {
  //     alert("Component Name is required.");
  //     return;
  //   }
  //   const allProperties = [...properties]; // Start with the properties already added

  //   // Check if the user has typed a property but not added it yet
  //   const isNewPropertyPartiallyFilled =
  //     newProperty.name.trim() !== "" ||
  //     newProperty.dataType.trim() !== "" ||
  //     newProperty.defaultValue.trim() !== "" ||
  //     newProperty.length.trim() !== "" ||
  //     newProperty.lengthType.trim() !== "";

  //   if (isNewPropertyPartiallyFilled) {
  //     // If they have, run the SAME strict validation as the 'addProperty' function
  //     if (indexNumber === 0) {
  //       if (
  //         newProperty.name.trim() === "" ||
  //         newProperty.dataType.trim() === ""
  //       ) {
  //         alert(
  //           "The property you are currently adding is incomplete. Please fill in Name and Data Type."
  //         );
  //         return;
  //       }
  //     } else if (indexNumber === 1) {
  //       const lengthValue = parseInt(newProperty.length);
  //       if (
  //         newProperty.name.trim() === "" ||
  //         newProperty.dataType.trim() === "" ||
  //         newProperty.lengthType.trim() === "" ||
  //         isNaN(lengthValue) ||
  //         lengthValue < 1
  //       ) {
  //         alert(
  //           "The property you are currently adding is incomplete. Please fill in Name, Data Type, Length Type, and a valid Length (minimum 1)."
  //         );
  //         return;
  //       }
  //     }
  //     // If the new property is valid, add it to our list for submission
  //     allProperties.push(newProperty);
  //   }

  //   if (allProperties.length === 0) {
  //     alert("Please add at least one property.");
  //     return;
  //   }

  //   // 2. In handleCreate: store the new rid and send the message
  //   const newRid = crypto.randomUUID();
  //   setLastRequestId(newRid); // Store the ID so our listener can find it

  //   // 1. Gather all the data from your form states
  //   const message = {
  //     rid: newRid,
  //     target:
  //       indexNumber === 0
  //         ? "instrument/category/create"
  //         : "instrument/category/dinamic/create",
  //     session: "xyz",
  //     payload: {
  //       name: componentName.trim().toLowerCase(),
  //       type: indexNumber === 0 ? "static" : "dinamic",
  //       properties: allProperties.map((p) => ({
  //         key: p.name.trim().toLowerCase(),
  //         datatype: p.dataType.trim().toLowerCase(),
  //         default:
  //           p.defaultValue.trim() === ""
  //             ? "-"
  //             : p.defaultValue.trim().toLowerCase(),
  //         length: p.length.trim().toLowerCase(),
  //         length_type: p.lengthType.trim().toLowerCase(),
  //       })),
  //     },
  //   };

  //   console.log("Sending via WS:", message);
  //   sendMessage(message);
  // };

  // 4. In useEffect: listen for the specific rid we just sent

  //by socket.ts
  // useEffect(() => {
  //   // Don't do anything if we haven't sent a request yet
  //   if (!lastRequestId) return;

  //   // Listen for responses
  //   const removeListener = addMessageListener((data) => {
  //     // Check if the response's rid matches the one we sent
  //     if (data.rid === lastRequestId && data.payload?.status === "success") {
  //       console.log("✅ Success response received:", data);
  //       onBack(); // Navigate back ONLY when the server confirms
  //     }
  //     // You could also add an 'else if' here to handle error responses
  //   });

  //   return removeListener; // Cleanup when the component unmounts
  // }, [lastRequestId, onBack]); // Rerun this effect if we send a new request

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
