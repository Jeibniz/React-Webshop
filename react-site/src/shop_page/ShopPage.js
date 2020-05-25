import React, { Component } from 'react';
import ShopPageItem from './components/ShopPageItem'//'components/ShopPageItem'

/**
 * Contains the page  where the user browses items to shop.
 */
class ShopPage extends Component {
    // TODO: Replace with data from API

    constructor(props) {
        super(props);
        const testData = ["Beastmaker 2000", "Black dimond quick draws", "Mad Rock shoes", "Moon Crash pad"];
        this.state = {itemData: testData};
        this.testItems = this.createTestItems();
    }

    createTestItems = () => {
      if(null === this.state.itemData){
          return null;
      }
      return this.state.itemData.map((element, id) => {
          return <ShopPageItem key = {id} data-testid = {'ShopPageItem'} itemName={element}/>;
      });
    };

    render() {
        return (
            <div className="App">
                {this.testItems}
            </div>
        );
    }
}

export default ShopPage;