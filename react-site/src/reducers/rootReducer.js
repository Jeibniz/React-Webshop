import { combineReducers } from 'redux';
import currentItemReducer from "reducers/currentItemReducer";
import cartReducer from "reducers/cartReducer"

/**
 * Combines all reducers in the project.
 */
export default combineReducers({
    currentItemReducer,
    cartReducer
});