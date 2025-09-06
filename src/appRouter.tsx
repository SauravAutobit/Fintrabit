import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserList from "./pages/userList/UserList";
import UserDetail from "./pages/userDetail/UserDetail";
import TradingAccountList from "./pages/tradingAccountList/TradingAccountList";
import TradingAccountDetail from "./pages/tradingAccountDetail/TradingAccountDetail";
import { Routing } from "./utils/constants/routes.constants";
import PropertiesComponent from "./pages/propertiesComponent/PropertiesComponent";
import CreateStaticComponnet from "./pages/createStaticComponnet/CreateStaticComponnet";

export const appRouter = createBrowserRouter([
  {
    path: Routing.home,
    element: <App />,
    children: [
      {
        path: Routing.home,
        element: <UserList />,
      },
      {
        path: Routing.userDetail,
        element: <UserDetail />,
      },
      {
        path: Routing.tradingAccount,
        element: <TradingAccountList />,
      },
      {
        path: Routing.tradingAccountDetail,
        element: <TradingAccountDetail />,
      },
      {
        path: Routing.propertiesComponent,
        element: <PropertiesComponent />,
      },
      {
        path: Routing.createStaticComponnet,
        element: <CreateStaticComponnet />,
      },

      {
        path: Routing.instruments,
        element: <div>Instruments Page</div>,
      },
    ],
  },
]);
