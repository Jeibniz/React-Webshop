import actionTypes from "actions/actionTypes";

/**
 * Will store the current item.
 */
export const addItemToCartAction = (cart, newItemId) => dispatch => {
    dispatch({
        type: actionTypes.CART_ADD_ITEM,
        cart: cart,
        item: newItemId
    })
};