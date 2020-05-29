import actionTypes from "actions/actionTypes";

/**
 * Will store the current item.
 */
export const currentItemAction = (item) => dispatch => {
    dispatch({
        type: actionTypes.CURRENT_ITEM,
        payload: item
    })
};