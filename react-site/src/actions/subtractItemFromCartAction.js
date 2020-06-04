import actionTypes from "actions/actionTypes";

/**
 * Will store the current item.
 */
export const subtractItemFromCartAction = (cart, itemId) => dispatch => {
    dispatch({
        type: actionTypes.CART_SUBTRACT_ITEM,
        cart: cart,
        item: itemId
    })
};