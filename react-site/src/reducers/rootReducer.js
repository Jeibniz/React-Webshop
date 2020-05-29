import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import currentItemReducer from "reducers/currentItemReducer";

/**
 * Combines all reducers in the project.
 */
export default combineReducers({
    simpleReducer,
    currentItemReducer
});