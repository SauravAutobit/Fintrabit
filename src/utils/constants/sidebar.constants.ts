import { Routing } from "./routes.constants";

export const sidebarOptions = [
  // {
  //   title: "User Management",
  //   children: [
  //     { name: "User", link: Routing.home },
  //     { name: "Trading Account", link: Routing.tradingAccount },
  //   ],
  // },
  // {
  //   title: "Trading A/C Management",
  //   children: [
  //     { name: "Brokerage Plan", link: "/brokerage-plan" },
  //     { name: "Account Setup", link: "/account-setup" },
  //     { name: "A/C Mapping", link: "/ac-mapping" },
  //   ],
  // },
  {
    title: "Instrument Management",
    children: [
      { name: "Properties Component", link: Routing.home },
      { name: "Instruments", link: Routing.instruments },
    ],
  },
];
