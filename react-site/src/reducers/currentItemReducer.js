import actionTypes from "actions/actionTypes"

/**
 * Handles actions storing current item.
 */
export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CURRENT_ITEM:
            return {
                current_item: action.payload
            };
        default:
            return state
    }
}