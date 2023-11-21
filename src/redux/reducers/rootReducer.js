import { combineReducers } from "redux";

import userAuthReducer from "./userAuthReducer";
import alertReducer from "./alertReducer";
import blogReducer from "./blogReducer";
import searchReducer from "./searchReducer";
import resultReducer from "./resultsReducer";
import doctorReducer from "./doctorReducer";
import bookAppointmentReducer from "./appointmentReducer";

const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    alert: alertReducer,
    blog: blogReducer,
    search: searchReducer,
    results: resultReducer,
    doctor: doctorReducer,
    appointment: bookAppointmentReducer,
});

export default rootReducer;