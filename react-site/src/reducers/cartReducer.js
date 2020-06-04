import actionTypes from "actions/actionTypes"

/**
 * Handles actions updating the cart.
 */
export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            return addItem(action.cart, action.item);
        case actionTypes.CART_REMOVE_ITEM:
            return removeItem(action.cart, action.item);
        case actionTypes.CART_SUBTRACT_ITEM:
            return subtractItem(action.cart, action.item);
        default:
            return state
    }
}

const addItem = (cart, itemId) => {
    cart = getValidMap(cart);
    let newValue = 1;
    // Add with what is currently in the cart
    if(cart.has(itemId)){
        newValue += cart.get(itemId);
    }
    cart.set(itemId, newValue);

    return createReduceObject(cart);
};

const removeItem = (cart, itemId) => {
    cart.delete(itemId);
    return createReduceObject(cart);
};

const subtractItem = (cart, itemId) => {
    // Do noting if item is not in cart
    if(!cart.has(itemId)){
        return createReduceObject(cart);
    }
    // Remove if this is last item in cart
    if (1 === cart.get(itemId)){
        console.log("removing");
        return removeItem(cart, itemId);
    }
    // Subtract one from item count
    cart.set(itemId, cart.get(itemId) - 1);
    return createReduceObject(cart);
};

/**
 * Creates the object that will be returned by the reducer.
 * @param cart The cart map that will be returned.
 */
const createReduceObject = (cart) => {
    return {
        cart: cart,
        itemsInCart: countItemsInCart(cart)
    };
};

/**
 * Will check if the cart is a defined non null map. IF so the
 * cart will be returned, otherwise a new map.
 */
const getValidMap = (map) => {
    if(undefined === map || null === map){
        console.log("CartReducer: the given cart map was null or undefined!");
        return new Map();
    }
    if(!(map instanceof Map)) {
        console.log("CartReducer: the given cart was no a map!");
        return new Map();
    }
    return map;
};

const countItemsInCart = (cart) => {
    // If cart is not a map
    if(!(cart instanceof Map)){
        return 0;
    }
    // Else sum values.
    let sum = 0;
    const values = cart.values();
    for(const value of values){
        sum += value;
    }
    return sum;
}