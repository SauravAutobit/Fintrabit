// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { componentTypes } from "../../config/componentConfig";
// import type { FormField } from "../../config/componentConfig";
// import { Routing } from "../../utils/constants/routes.constants";
// import SubHeaderOptions from "../../components/subHeaderOptions/SubHeaderOptions";
// import ComponentNameInput from "../../components/componentNameInput/ComponentNameInput";
// import AddProperties from "../../components/addProperties/AddProperties";
// import { Form, Row, Col } from "react-bootstrap";
// import "../../pages/createStaticComponnet/CreateStaticComponnet.css";

// // Define a specific type for a property
// interface Property {
//   name: string;
//   defaultValue: string;
//   dataType: string;
// }

// const CreateComponentPage = () => {
//   const navigate = useNavigate();
//   const { type } = useParams<{ type: "static" | "dynamic" }>();

//   // CHANGE 1: Specify the type for the form values state.
//   // We'll assume all values are strings, which is safe for form inputs.
//   const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

//   // CHANGE 2: Use the specific 'Property' type instead of 'any[]'.
//   const [additionalProperties, setAdditionalProperties] = useState<Property[]>(
//     []
//   );

//   const [componentName, setComponentName] = useState("");

//   if (!type || !componentTypes[type]) {
//     return <div>Invalid Component Type</div>;
//   }

//   const config = componentTypes[type];

//   // CHANGE 3: Specify the event type for the input change handler.
//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreate = () => {
//     const finalData = {
//       type,
//       componentName,
//       ...formValues,
//       additionalProperties,
//     };
//     console.log("CREATING:", finalData);
//     navigate(Routing.propertiesComponent);
//   };

//   const renderFormControl = (field: FormField) => {
//     if (field.type === "select") {
//       return (
//         <Form.Select
//           name={field.id}
//           value={formValues[field.id] || ""}
//           onChange={handleInputChange}
//           className="detailsForm-input"
//         >
//           <option value="">{field.placeholder}</option>
//           {field.options?.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </Form.Select>
//       );
//     }
//     return (
//       <Form.Control
//         type={field.type}
//         name={field.id}
//         placeholder={field.placeholder}
//         value={formValues[field.id] || ""}
//         onChange={handleInputChange}
//         className="detailsForm-input"
//       />
//     );
//   };

//   return (
//     <>
//       <SubHeaderOptions
//         options={[config.title]}
//         selectedTab={0}
//         setSelectedTab={() => {}}
//         showBtn={true}
//         btnText="Create"
//         btnRoute={Routing.propertiesComponent}
//         onBtnClick={handleCreate}
//       />

//       <div className="createStaticComponnet-container">
//         <ComponentNameInput
//           value={componentName}
//           onChange={(e) => setComponentName(e.target.value)}
//         />

//         <div
//           className="properties-container"
//           style={{
//             border: "none",
//             background: "transparent",
//             padding: 0,
//             marginTop: "20px",
//           }}
//         >
//           <div className="properties-heading">Properties</div>
//           {config.formLayout.map((row, rowIndex) => (
//             <Row key={rowIndex} className="mb-3">
//               {row.fields.map((field) => (
//                 <Col md={12 / row.fields.length} key={field.id}>
//                   <Form.Group>
//                     <Form.Label>{field.label}</Form.Label>
//                     {renderFormControl(field)}
//                   </Form.Group>
//                 </Col>
//               ))}
//             </Row>
//           ))}
//         </div>

//         <AddProperties
//           properties={additionalProperties}
//           setProperties={setAdditionalProperties}
//         />
//       </div>
//     </>
//   );
// };

// export default CreateComponentPage;
