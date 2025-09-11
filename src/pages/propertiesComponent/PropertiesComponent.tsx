import { useEffect, useState } from "react";
import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
import NoDataList from "../../components/noDataList/NoDataList";
import noUserList from "../../assets/icons/noUserList.svg";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import EditDelete from "../../components/editDelete/EditDelete";
import "./PropertiesComponent.css";
import CreateStaticComponnet from "../createStaticComponnet/CreateStaticComponnet";
// by socket.ts
// import {
//   addMessageListener,
//   getConnectionState,
//   sendMessage,
// } from "../../socket";
import { Dropdown, DropdownButton } from "react-bootstrap";

// import { apiClient } from "../../services/socketService"; // Import the client
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

import {
  fetchComponentsByType,
  updateComponent, // ✅ Import new thunks
  deleteComponentById,
  editLocalComponent,
} from "../../store/slices/componentsSlice"; //

// Define the shape of our data
interface Property {
  key: string;
  datatype: string;
  default: string;
  length?: string;
  length_type?: string;
}

// interface ComponentData {
//   id: string;
//   name: string;
//   properties: Property[];
//   type: string;
// }

const PropertiesComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isCreateMode, setCreateMode] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [components, setComponents] = useState<ComponentData[]>([]);

  // by socket.ts
  // State to track the ID of the last user action (update/delete)
  // const [lastActionRid, setLastActionRid] = useState<string | null>(null);

  // State to manage which specific property is being edited
  const [editableState, setEditableState] = useState<{
    componentIndex: number | null;
    propertyIndex: number | null;
  }>({ componentIndex: null, propertyIndex: null });

  // by socket.ts
  // useEffect(() => {
  //   setIsLoading(true);
  //   setComponents([]);

  //   const rid = crypto.randomUUID();
  //   const componentType = selectedTab === 0 ? "static" : "dinamic";

  //   const message = {
  //     rid,
  //     target: "fetch",
  //     session: "xyz",
  //     payload: {
  //       query: `fintrabit.instrument_categories[type="${componentType}"]`,
  //     },
  //   };

  //   const trySendMessage = () => {
  //     // Check if the socket is ready
  //     if (getConnectionState() === WebSocket.OPEN) {
  //       console.log("Socket is open. Requesting component list:", message);
  //       sendMessage(message);
  //     } else {
  //       // If not ready, wait a bit and try again
  //       console.log("Socket not open, waiting to send...");
  //       setTimeout(trySendMessage, 100); // Retry every 100ms
  //     }
  //   };

  //   // Start the process
  //   trySendMessage();

  //   const removeListener = addMessageListener((data) => {
  //     if (data.rid === rid && data.payload?.status === "success") {
  //       console.log("✅ Component list received:", data.payload.data);
  //       setComponents(data.payload.data as ComponentData[]);
  //       setIsLoading(false);
  //     } else if (data.rid === rid) {
  //       console.error("Failed to fetch component list:", data.payload?.message);
  //       setIsLoading(false);
  //     }

  //     // Case 2: Handle the response for an update or delete action
  //     if (data.rid === lastActionRid && data.payload?.status === "success") {
  //       console.log("✅ Action successful:", data.payload.message);
  //       // Action was successful, no need to do anything else here as local state is already updated
  //       setLastActionRid(null); // Clear the ID
  //     } else if (data.rid === lastActionRid) {
  //       console.error("❌ Action failed:", data.payload.message);
  //       // Optionally, you could revert the local state change here
  //       setLastActionRid(null);
  //     }
  //   });

  //   return () => {
  //     removeListener();
  //   }; // Cleanup listener
  // }, [lastActionRid, selectedTab]);

  // Use a useCallback to memoize the fetch function

  const dispatch = useDispatch<AppDispatch>(); // ✅ Get the dispatch function

  const componentType = selectedTab === 0 ? "static" : "dinamic";

  // ✅ Get all data directly from the Redux store
  const { data: components, status } = useSelector(
    (state: RootState) => state.components[componentType]
  );
  const apiStatus = useSelector(
    (state: RootState) => state.websockets.apiStatus
  );

  // const fetchComponents = useCallback(async () => {
  //   // setIsLoading(true);
  //   setComponents([]);

  //   const componentType = selectedTab === 0 ? "static" : "dinamic";
  //   const payload = {
  //     query: `fintrabit.instrument_categories[type="${componentType}"]`,
  //   };

  //   try {
  //     const response = await apiClient.send<ComponentData[]>("fetch", payload);
  //     console.log("✅ Component list received:", response.data);
  //     setComponents(response.data || []);
  //   } catch (error: unknown) {
  //     console.error("❌ Failed to fetch component list:", error);
  //     // Optionally show an error message to the user
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // }, [selectedTab]); // Dependency array

  useEffect(() => {
    if (apiStatus === "connected" && status === "idle") {
      dispatch(fetchComponentsByType(componentType));
    }
  }, [apiStatus, status, componentType, dispatch]); // Effect runs when fetchComponents changes

  // const handleComponentNameChange = (
  //   componentIndex: number,
  //   newName: string
  // ) => {
  //   const updatedComponents = [...components];
  //   updatedComponents[componentIndex].name = newName;
  //   // setComponents(updatedComponents);
  // };

  // ✅ FIX: This function now dispatches an action to Redux

  const handleComponentNameChange = (
    componentIndex: number,
    newName: string
  ) => {
    const componentToEdit = { ...components[componentIndex], name: newName };
    dispatch(editLocalComponent(componentToEdit));
  };

  // const handlePropertyUpdate = (
  //   componentIndex: number,
  //   propertyIndex: number,
  //   field: keyof Property,
  //   value: string
  // ) => {
  //   const updatedComponents = [...components];
  //   updatedComponents[componentIndex].properties[propertyIndex] = {
  //     ...updatedComponents[componentIndex].properties[propertyIndex],
  //     [field]: value,
  //   };
  //   // setComponents(updatedComponents);
  // };

  // ✅ FIX: This function also dispatches an action to Redux

  const handlePropertyUpdate = (
    componentIndex: number,
    propertyIndex: number,
    field: keyof Property,
    value: string
  ) => {
    // Create a deep copy to avoid direct mutation
    const componentToEdit = JSON.parse(
      JSON.stringify(components[componentIndex])
    );
    componentToEdit.properties[propertyIndex][field] = value;
    dispatch(editLocalComponent(componentToEdit));
  };

  const saveComponent = async (componentIndex: number) => {
    const componentToSave = components[componentIndex];

    // --- VALIDATION LOGIC HERE ---
    if (componentToSave.name.trim() === "") {
      alert("Component Name cannot be empty.");
      return; // Stop the process if validation fails
    }

    for (const prop of componentToSave.properties) {
      if (prop.key.trim() === "") {
        alert(`A property in "${componentToSave.name}" must have a name.`);
        return;
      }
      // Add any other validation for properties you need...
    }
    // --- END VALIDATION ---

    setEditableState({ componentIndex: null, propertyIndex: null });

    console.log("Dispatching update for:", componentToSave.name);
    dispatch(updateComponent(componentToSave));

    // const targetUrl =
    //   componentToUpdate.type === "static"
    //     ? "instrument/category/update"
    //     : "instrument/category/dinamic/update";

    // // Map properties and include dynamic fields only when needed
    // const propertiesPayload = componentToUpdate.properties.map((p) => {
    //   const baseProperty = {
    //     key: p.key,
    //     datatype: p.datatype,
    //     default: p.default,
    //   };
    //   if (componentToUpdate.type === "dinamic") {
    //     return {
    //       ...baseProperty,
    //       length: p.length || "",
    //       length_type: p.length_type || "",
    //     };
    //   }
    //   return baseProperty;
    // });

    // const messagePayload = {
    //   id: componentToUpdate.id,
    //   name: componentToUpdate.name,
    //   type: componentToUpdate.type,
    //   properties: propertiesPayload,
    // };

    // try {
    //   await apiClient.send(targetUrl, messagePayload);
    //   console.log("✅ Component updated successfully!");

    //   // ✅ Refresh data from the server to ensure consistency
    //   dispatch(fetchComponentsByType(componentType));

    //   // Optional: you could re-fetch data here or just rely on local state
    //   // fetchComponents();
    // } catch (error: unknown) {
    //   console.error("❌ Failed to update component:", error);
    //   let errorMessage = "Update failed.";
    //   if (error && typeof error === "object" && "message" in error) {
    //     errorMessage = String(error.message);
    //   }
    //   alert(`Update Failed: ${errorMessage}`);
    // }
  };

  const deleteComponent = async (componentIndex: number) => {
    const componentToDelete = components[componentIndex];

    console.log("Dispatching delete for:", componentToDelete.name);
    dispatch(
      deleteComponentById({ component: componentToDelete, componentType })
    );
    // const targetUrl =
    //   componentToDelete.type === "static"
    //     ? "instrument/category/delete"
    //     : "instrument/category/dinamic/delete"; // Assuming this is the dynamic delete target

    // // Optimistically update the UI first for a better user experience
    // // setComponents((prev) => prev.filter((c) => c.id !== componentToDelete.id));

    // try {
    //   await apiClient.send(targetUrl, { id: componentToDelete.id });
    //   console.log("✅ Component deleted successfully!");

    //   // ✅ Refresh data from the server
    //   dispatch(fetchComponentsByType(componentType));
    // } catch (error: unknown) {
    //   console.error("❌ Failed to delete component:", error);
    //   // If the delete failed, we should revert the UI change
    //   // fetchComponents(); // The easiest way to revert is to re-fetch the truth from the server
    // }
  };

  // by socket.ts
  // const saveComponent = (componentIndex: number) => {
  //   setEditableState({ componentIndex: null, propertyIndex: null });
  //   const componentToUpdate = components[componentIndex];
  //   const newRid = crypto.randomUUID();
  //   setLastActionRid(newRid);

  //   const targetUrl =
  //     componentToUpdate.type === "static"
  //       ? "instrument/category/update"
  //       : "instrument/category/dinamic/update";

  //   // Map properties and include dynamic fields only when needed
  //   const propertiesPayload = componentToUpdate.properties.map((p) => {
  //     const baseProperty = {
  //       key: p.key,
  //       datatype: p.datatype,
  //       default: p.default,
  //     };
  //     if (componentToUpdate.type === "dinamic") {
  //       return {
  //         ...baseProperty,
  //         length: p.length || "",
  //         length_type: p.length_type || "",
  //       };
  //     }
  //     return baseProperty;
  //   });

  //   const message = {
  //     rid: newRid,
  //     target: targetUrl,
  //     session: "xyz",
  //     payload: {
  //       id: componentToUpdate.id,
  //       name: componentToUpdate.name, // Assuming you might make the name editable too
  //       type: componentToUpdate.type,
  //       properties: propertiesPayload,
  //     },
  //   };

  //   console.log("Sending update message:", message);
  //   sendMessage(message);
  // };

  // by socket.ts
  // const deleteComponent = (componentIndex: number) => {
  //   const componentToDelete = components[componentIndex];
  //   const newRid = crypto.randomUUID();
  //   setLastActionRid(newRid);

  //   const targetUrl =
  //     componentToDelete.type === "static"
  //       ? "instrument/category/delete"
  //       : "instrument/category/dinamic/delete"; // Assuming this is the dynamic delete target

  //   const message = {
  //     rid: newRid,
  //     target: targetUrl,
  //     session: "xyz",
  //     payload: {
  //       id: componentToDelete.id,
  //     },
  //   };

  //   console.log("Sending delete message:", message);
  //   sendMessage(message);

  //   // Optimistically update the UI
  //   setComponents((prev) => prev.filter((c) => c.id !== componentToDelete.id));
  // };

  if (isCreateMode) {
    return (
      <CreateStaticComponnet
        index={selectedTab}
        onBack={() => {
          setCreateMode(false);
          // dispatch(fetchComponentsByType(componentType));
        }}
      />
    );
  }

  // ✅ The loading logic now checks the status from Redux
  const isLoading =
    status === "loading" || status === "idle" || apiStatus !== "connected";

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
        onClick={() => setCreateMode(true)}
      />
      {isLoading || apiStatus !== "connected" ? (
        <p>Loading...</p>
      ) : components?.length === 0 ? (
        <NoDataList
          image={noUserList}
          text={"You don't have any user yet"}
          imageAlt={"no user list"}
        />
      ) : (
        <Accordion
          className="main-content-noFooter component-list-accordion properties-accordion"
          alwaysOpen
        >
          {components.map((component, componentIndex) => {
            const isAnyPropertyEditing =
              editableState.componentIndex === componentIndex;

            return (
              <Accordion.Item
                eventKey={String(componentIndex)}
                key={component.id}
              >
                <Accordion.Header>{component.name}</Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-4">
                    <Form.Group as={Col} md={12}>
                      <Form.Label>Component Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={component.name}
                        // The component name is only editable if any of its properties are being edited
                        disabled={!isAnyPropertyEditing}
                        onChange={(e) =>
                          handleComponentNameChange(
                            componentIndex,
                            e.target.value
                          )
                        }
                        className={
                          isAnyPropertyEditing
                            ? "detailsForm-input"
                            : "detailsForm-input-disabled"
                        }
                      />
                    </Form.Group>
                  </Row>

                  {component.properties?.length > 0 ? (
                    <Accordion className="properties-accordion">
                      {component.properties.map((property, propertyIndex) => {
                        const isCurrentlyEditing =
                          editableState.componentIndex === componentIndex &&
                          editableState.propertyIndex === propertyIndex;

                        return (
                          <Accordion.Item
                            eventKey={String(propertyIndex)}
                            key={propertyIndex}
                          >
                            <Accordion.Header>{property.key}</Accordion.Header>
                            <Accordion.Body>
                              {/* --- STATIC property display with Dropdown --- */}
                              {component.type === "static" && (
                                <>
                                  <Row className="mb-3">
                                    <Form.Group as={Col} md={6}>
                                      <Form.Label>Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        defaultValue={property.key}
                                        disabled={!isCurrentlyEditing}
                                        onChange={(e) =>
                                          handlePropertyUpdate(
                                            componentIndex,
                                            propertyIndex,
                                            "key",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isCurrentlyEditing
                                            ? "detailsForm-input"
                                            : "detailsForm-input-disabled"
                                        }
                                      />
                                    </Form.Group>
                                    <Form.Group as={Col} md={6}>
                                      <Form.Label>Default Value</Form.Label>
                                      <Form.Control
                                        type="text"
                                        defaultValue={property.default}
                                        disabled={!isCurrentlyEditing}
                                        onChange={(e) =>
                                          handlePropertyUpdate(
                                            componentIndex,
                                            propertyIndex,
                                            "default",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isCurrentlyEditing
                                            ? "detailsForm-input"
                                            : "detailsForm-input-disabled"
                                        }
                                      />
                                    </Form.Group>
                                  </Row>
                                  <Row>
                                    <Form.Group as={Col} md={12}>
                                      <Form.Label>Data Type</Form.Label>
                                      <DropdownButton
                                        id={`dropdown-datatype-${propertyIndex}`}
                                        title={property.datatype || "Select"}
                                        className={
                                          isCurrentlyEditing
                                            ? "dropDown-btn"
                                            : "detailsForm-input-disabled"
                                        }
                                        disabled={!isCurrentlyEditing}
                                      >
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "datatype",
                                              "int"
                                            )
                                          }
                                        >
                                          int
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "datatype",
                                              "numeric"
                                            )
                                          }
                                        >
                                          numeric
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "datatype",
                                              "string"
                                            )
                                          }
                                        >
                                          string
                                        </Dropdown.Item>
                                      </DropdownButton>
                                    </Form.Group>
                                  </Row>
                                </>
                              )}

                              {/* --- DYNAMIC property display with Dropdowns --- */}
                              {component.type === "dinamic" && (
                                <>
                                  <Row className="mb-3">
                                    <Form.Group as={Col} md={6}>
                                      <Form.Label>Name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        defaultValue={property.key}
                                        disabled={!isCurrentlyEditing}
                                        onChange={(e) =>
                                          handlePropertyUpdate(
                                            componentIndex,
                                            propertyIndex,
                                            "key",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isCurrentlyEditing
                                            ? "detailsForm-input"
                                            : "detailsForm-input-disabled"
                                        }
                                      />
                                    </Form.Group>
                                    <Form.Group as={Col} md={6}>
                                      <Form.Label>Length</Form.Label>
                                      <Form.Control
                                        type="number"
                                        defaultValue={property?.length}
                                        disabled={!isCurrentlyEditing}
                                        onChange={(e) =>
                                          handlePropertyUpdate(
                                            componentIndex,
                                            propertyIndex,
                                            "length",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isCurrentlyEditing
                                            ? "detailsForm-input"
                                            : "detailsForm-input-disabled"
                                        }
                                      />
                                    </Form.Group>
                                  </Row>
                                  <Row>
                                    <Form.Group as={Col} md={6}>
                                      <Form.Label>Data Type</Form.Label>
                                      <DropdownButton
                                        id={`dropdown-datatype-${propertyIndex}`}
                                        title={property.datatype || "Select"}
                                        className={
                                          isCurrentlyEditing
                                            ? "dropDown-btn"
                                            : "detailsForm-input-disabled"
                                        }
                                        disabled={!isCurrentlyEditing}
                                      >
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "datatype",
                                              "int"
                                            )
                                          }
                                        >
                                          int
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "datatype",
                                              "numeric"
                                            )
                                          }
                                        >
                                          numeric
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "datatype",
                                              "string"
                                            )
                                          }
                                        >
                                          string
                                        </Dropdown.Item>
                                      </DropdownButton>
                                    </Form.Group>
                                    <Form.Group as={Col} md={6}>
                                      <Form.Label>Length Type</Form.Label>
                                      <DropdownButton
                                        id={`dropdown-lengthtype-${propertyIndex}`}
                                        title={
                                          property?.length_type || "Select"
                                        }
                                        className={
                                          isCurrentlyEditing
                                            ? "dropDown-btn"
                                            : "detailsForm-input-disabled"
                                        }
                                        disabled={!isCurrentlyEditing}
                                      >
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "length_type",
                                              "upto"
                                            )
                                          }
                                        >
                                          upto
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "length_type",
                                              "exact"
                                            )
                                          }
                                        >
                                          exact
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handlePropertyUpdate(
                                              componentIndex,
                                              propertyIndex,
                                              "length_type",
                                              "infinite"
                                            )
                                          }
                                        >
                                          infinite
                                        </Dropdown.Item>
                                      </DropdownButton>
                                    </Form.Group>
                                  </Row>
                                </>
                              )}

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "1rem",
                                }}
                              >
                                <EditDelete
                                  isEditing={isCurrentlyEditing}
                                  onEdit={() =>
                                    setEditableState({
                                      componentIndex,
                                      propertyIndex,
                                    })
                                  }
                                  onSave={() => saveComponent(componentIndex)}
                                  onDelete={() =>
                                    deleteComponent(componentIndex)
                                  }
                                />
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                  ) : (
                    <p style={{ color: "var(--primary-color)" }}>
                      This component has no properties.
                    </p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </>
  );
};

export default PropertiesComponent;
