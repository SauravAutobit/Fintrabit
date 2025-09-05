import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserList from "./pages/userList/UserList";
import UserDetail from "./pages/userDetail/UserDetail";
import TradingAccountList from "./pages/tradingAccountList/TradingAccountList";
import TradingAccountDetail from "./pages/tradingAccountDetail/TradingAccountDetail";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
      {
        path: "/user-detail",
        element: <UserDetail />,
      },
      {
        path: "/trading-account",
        element: <TradingAccountList />,
      },
      {
        path: "/trading-account-detail",
        element: <TradingAccountDetail />,
      },
    ],
  },
]);
