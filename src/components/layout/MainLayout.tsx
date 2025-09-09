// import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar/Sidebar";
// import { useState } from "react";
// import "./MainLayout.css"; // We will create this file next

// interface MainLayoutProps {
//   hasFooter: boolean;
// }

// const MainLayout = ({ hasFooter }: MainLayoutProps) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="main-layout-container">
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       {/* This wrapper gets the dynamic class for height */}
//       <main
//         className={`page-content-wrapper ${
//           hasFooter ? "with-footer" : "no-footer"
//         }`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default MainLayout;
