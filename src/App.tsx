import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
// import { initSocket } from "./socket";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useEffect(() => {
  //   const ws = initSocket();

  //   // return () => {
  //   //   ws.close(); // cleanup on unmount
  //   // };
  //   return () => {
  //     if (import.meta.env.PROD) {
  //       ws.close();
  //     }
  //   };
  // }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="main-content">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          //   toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className="page-content"
          style={{
            marginLeft: isSidebarOpen ? "0px" : "236px",
            transition: "margin-left 0.3s",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
