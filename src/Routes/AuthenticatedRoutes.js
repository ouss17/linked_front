import Profile from "../pages/User/Profile";

export default [

  {
    name: "Profil",
    path: "profil",
    element: <Profile />,
    allowed: ["ROLE_USER", "ROLE_ADMIN", "ROLE_GERANT"],
    subNavigations: [],
    index: false,
    end: false,
  },


];
