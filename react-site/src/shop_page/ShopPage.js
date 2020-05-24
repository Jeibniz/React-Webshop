import React, { Component } from 'react';
import ShopPageItem from './components/ShopPageItem'//'components/ShopPageItem'

/**
 * Contains the page  where the user browses items to shop.
 */
class ShopPage extends Component {
    // TODO: Replace with data from API
    testData = ["Beastmaker 2000", "Black dimond quick draws", "Mad Rock shoes", "Moon Crash pad"];
    testItems = this.testData.map((element) => {
       return  <ShopPageItem itemName={element}/>;
    });

    render() {
        return (
            <div className="App">
                {this.testItems}
            </div>
        );
    }
}

export default ShopPage;