import { combineReducers } from "redux";
import ActuReducer from "./reducers/ActuReducer";
import ActusAvailableReducer from "./reducers/ActusAvailableReducer";
import ActusByCategoryReducer from "./reducers/ActusByCategoryReducer";
import ActusByEtablissementReducer from "./reducers/ActusByEtablissementReducer";
import CategoriesReducer from "./reducers/CategoriesReducer";
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


const RootReducers = combineReducers({
    ActuReducer,
    ActusAvailableReducer,
    ActusByCategoryReducer,
    ActusByEtablissementReducer,
    CategoriesReducer,
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
});

export default RootReducers;
