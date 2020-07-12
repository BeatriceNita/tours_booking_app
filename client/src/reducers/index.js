import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";

//combine the authReducer and errorReducer into one rootReducer
const allReducers = combineReducers({
    auth: authReducers,
    errors: errorReducers
});

export default allReducers;