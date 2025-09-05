export const sidebarOptions = [
  {
    title: "User Management",
    children: [
      { name: "User", link: "/" },
      { name: "Trading Account", link: "/trading-account" },
    ],
  },
  {
    title: "Trading A/C Management",
    children: [
      { name: "Brokerage Plan", link: "/brokerage-plan" },
      { name: "Account Setup", link: "/account-setup" },
      { name: "A/C Mapping", link: "/ac-mapping" },
    ],
  },
  {
    title: "Admins Management",
    children: [
      { name: "Create Admin", link: "/create-admin" },
      { name: "Manage Roles", link: "/manage-roles" },
    ],
  },
  // ... repeat same structure for others
];
