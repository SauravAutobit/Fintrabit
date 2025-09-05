import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        //   toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}

export default App;
