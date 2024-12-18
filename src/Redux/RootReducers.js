import { combineReducers } from "redux";
import ActuReducer from "./reducers/ActuReducer";
import ActusAvailableReducer from "./reducers/ActusAvailableReducer";
import ActusByCategoryReducer from "./reducers/ActusByCategoryReducer";
import ActusByEtablissementReducer from "./reducers/ActusByEtablissementReducer";
import AllActusByEtablissementReducer from "./reducers/AllActusByEtablissementReducer";
import CategoriesReducer from "./reducers/CategoriesReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import CategoriesActiveReducer from "./reducers/CategoriesActiveReducer";
import EtablissementConfigReducer from "./reducers/EtablissementConfigReducer";
import EtablissementReducer from "./reducers/EtablissementReducer";
import EtablissementsReducer from "./reducers/EtablissementsReducer";
import FeedbackReducer from "./reducers/FeedbackReducer";
import FeedbacksByEtablissementReducer from "./reducers/FeedbacksByEtablissementReducer";
import FeedbacksReducer from "./reducers/FeedbacksReducer";
import MeReducer from "./reducers/MeReducer";
import NotificationReducer from "./reducers/NotificationReducer";
import NotificationsReducer from "./reducers/NotificationsReducer";
import PaymentCardsByUserReducer from "./reducers/PaymentCardsByUserReducer";
import UserReducer from "./reducers/UserReducer";
import UsersReducer from "./reducers/UsersReducer";
import RolesReducer from "./reducers/RolesReducer";



const RootReducers = combineReducers({
    ActuReducer,
    ActusAvailableReducer,
    ActusByCategoryReducer,
    ActusByEtablissementReducer,
    AllActusByEtablissementReducer,
    CategoriesReducer,
    CategoryReducer,
    CategoriesActiveReducer,
    EtablissementConfigReducer,
    EtablissementReducer,
    EtablissementsReducer,
    FeedbackReducer,
    FeedbacksByEtablissementReducer,
    FeedbacksReducer,
    MeReducer,
    NotificationReducer,
    NotificationsReducer,
    PaymentCardsByUserReducer,
    UserReducer,
    UsersReducer,
    RolesReducer,
});

export default RootReducers;
