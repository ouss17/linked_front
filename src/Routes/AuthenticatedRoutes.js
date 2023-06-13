import StripePaymentForm from "../pages/Payment/Stripe";
import Profile from "../pages/User/Profile";

export default [

  {
    name: "stripe",
    path: "/payment/stripe",
    element: <StripePaymentForm />,
    allowed: ["ROLE_USER", "ROLE_ADMIN", "ROLE_GERANT"],
    subNavigations: [],
    index: false,
    end: false,
  },


];
