import actionTypes from "actions/actionTypes";

/**
 * Will store the current item.
 */
export const removeItemFromCartAction = (cart, itemId) => dispatch => {
    dispatch({
        type: actionTypes.CART_REMOVE_ITEM,
        cart: cart,
        item: itemId
    })
};