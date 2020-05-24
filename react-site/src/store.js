import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

/**
 * Creates the applications Redux store.
 * @returns {Store<any & any, Action> & any} The Redux store of the app.
 */
export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}