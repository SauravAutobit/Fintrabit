// import "./QueryDetails.css";
// import backArrow from "../../assets/icons/backArrow.svg";
// import deleteIcon from "../../assets/icons/deleteIcon.svg";
// import Form from "react-bootstrap/Form";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import { useState } from "react";
// // import EditDelete from "../editDelete/EditDelete";

// interface QueryDetailsProps {
//   onBack: () => void;
//   section: string;
//   name?: string;
//   nameValue?: string;
//   total?: string;
//   totalValue?: number;
// }
// const QueryDetails = ({
//   onBack,
//   section,
//   name,
//   nameValue,
//   total,
//   totalValue,
// }: QueryDetailsProps) => {
//   const [dropdownText, setDropdownText] = useState("Select Data Type");
//   const [isEditable, setIsEditable] = useState(false);

//   const leverageRows = Array.from({ length: 5 }, (_, i) => `Leverage ${i + 1}`);
//   return (
//     // <div>
//     //   <div className="queryDetails-nav" onClick={onBack}>
//     //     <img src={backArrow} alt="backArrow" width={11.78} height={20} />
//     //     <div className="queryDetails-nav-text">{section}</div>
//     //   </div>
//     //   <div className="queryDetails-container">
//     //     <div className="queryDetails-content">
//     //       <div className="instrument-details">
//     //         <div className="detail-row">
//     //           <span className="label mb-4">{name}</span>
//     //           <span className="value mb-4">{nameValue}</span>
//     //         </div>
//     //         <div className="detail-row">
//     //           <span className="label">{total}</span>
//     //           <span className="value">{totalValue}</span>
//     //         </div>
//     //       </div>
//     //       {/* <EditDelete enableEdit={() => setIsEditable(true)} /> */}
//     //     </div>

//     //     <table className="queryDetails-table">
//     //       <thead>
//     //         <tr className="queryDetails-table-row">
//     //           <th className="queryDetails-table-heading">Leverage Name</th>
//     //           <th className="queryDetails-table-heading">Leverage Value</th>
//     //           <th className="queryDetails-table-heading">Leverage Type</th>
//     //           <th></th>
//     //         </tr>
//     //       </thead>
//     //       <tbody>
//     //         {leverageRows.map((label, index) => (
//     //           <tr key={index}>
//     //             <td>{label}</td>
//     //             <td>
//     //               <Form.Control
//     //                 type="text"
//     //                 placeholder="Enter Value"
//     //                 name={`value-${index}`}
//     //                 className={`detailsForm-input ${
//     //                   !isEditable ? "disabled-input" : ""
//     //                 }`}
//     //                 disabled={!isEditable}
//     //               />
//     //             </td>
//     //             <td>
//     //               <DropdownButton
//     //                 id={`dropdown-${index}`}
//     //                 title={dropdownText}
//     //                 className={!isEditable ? "disabled-dropdown" : ""}
//     //                 disabled={!isEditable}
//     //               >
//     //                 <Dropdown.Item onClick={() => setDropdownText("Option 1")}>
//     //                   Option 1
//     //                 </Dropdown.Item>
//     //                 <Dropdown.Item onClick={() => setDropdownText("Option 2")}>
//     //                   Option 2
//     //                 </Dropdown.Item>
//     //                 <Dropdown.Item onClick={() => setDropdownText("Option 3")}>
//     //                   Option 3
//     //                 </Dropdown.Item>
//     //               </DropdownButton>
//     //             </td>
//     //             <td>
//     //               <img
//     //                 src={deleteIcon}
//     //                 alt="deleteIcon"
//     //                 className={
//     //                   !isEditable ? "deleteIcon-disabled" : "deleteIcon-enabled"
//     //                 }
//     //               />
//     //             </td>
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   </div>
//     // </div>
//   );
// };

// export default QueryDetails;
