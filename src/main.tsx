import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./appRouter.tsx";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store/store.ts"; // 1. Import your store
import { initializeSockets } from "./services/socketService.ts"; // 2. Import the initializer

initializeSockets(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <RouterProvider router={appRouter} />
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
