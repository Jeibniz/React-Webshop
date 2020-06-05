import placeholderData from 'placeholder_resources/itemData.json'

/**
 * Loads item from the API.
 */
class ItemLoader {
    /**
     * Returns all items in the given cart map
     * @param cart A map, mapping item id to quantity of that item.
     * @return {Array}
     */
    static loadItems (cart) {
        const items = [];
        // If cart is empty
        if(undefined === cart || null === cart){
            return items;
        }
        cart.forEach(
            (value, key) => {
                items.push(ItemLoader.loadItem(key, value))
            });
        return items;
    };


    /**
     * Returns an item given an id.
     * @param id The it of the item that will be returned.
     * @param quantity The quantity of the given item
     * @return returns null if no item has the given id.
     */
    static loadItem(id, quantity) {
        // TODO: Update with API call
        for(let i = 0; i < placeholderData.items.length; i++){
            if(id === placeholderData.items[i].id){
                const item = placeholderData.items[i];
                // Enrich data with quantity.
                item.quantity = quantity;
                return item;
            }
        }
        return null;
    };
}

export default ItemLoader;

