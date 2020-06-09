import actionTypes from "actions/actionTypes";

/**
 * Will store the current item.
 */
export const emptyCartAction = () => dispatch => {
    dispatch({
        type: actionTypes.CART_EMPTY
    })
};