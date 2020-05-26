import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ShopPageItem from './components/ShopPageItem'

import './ShopPage.css';

/**
 * Contains the page where the user browses items to shop.
 */
class ShopPage extends Component {
    // TODO: Replace with data from API

    ITEMS_PER_ROW = 3;
    GRID_SPACING = 10;

    constructor(props) {
        super(props);
        const testData =
            ["Beastmaker 2000", "Black diamond quick draws", "Mad Rock shoes", "Moon Crash pad", "Simond helmet",
                "Screewgate carabiner", "La sportvia T-shirt", "Mammuth rope"];
        this.state = {itemData: testData};
        let items = this.createTestItems();
        this.grid = this.createGridRows(items, this.ITEMS_PER_ROW, this.GRID_SPACING);
        //this.grid = <p>Hello</p>;
    }

    createTestItems = () => {
      if(null === this.state.itemData){
          return null;
      }
      return this.state.itemData.map((element, id) => {
          return    <Grid item
                          key = {"shop_page_item_" + id}
                          data-testid="item"
                          className ="ShopPage-GridItem"
                          >
                        <ShopPageItem
                            key = {"shop_page_item_" + id}
                            className ="test"
                            itemName={element}/>
                    </Grid>
      });
    };

    createGridRows = (items, itemsPerRow, spacing) => {
        let itemsInContainers = [];
        let temp = [];
        let key;

        // Get itemsPerRow items and wrap them in a container. Then repeat.
        for(let i = 0; i < items.length; i++){
            temp.push(items[i]);
            // Wrap if itemsPerRow items have been grouped or if we are at last item.
            if(i % itemsPerRow === itemsPerRow - 1 || i === items.length - 1){
                key = Math.floor(i / itemsPerRow);
                itemsInContainers.push(this.wrapTagsInGridContainer(temp, spacing, key));
                temp = [];
            }
        }

        return itemsInContainers;
    };

    wrapTagsInGridContainer = (items, spacing, key) => {
        return <Grid
            container
            className ="ShopPage-GridContainer"
            key = {key} data-testid="container"
            spacing={spacing}> {items} </Grid>
    };

    render() {
        return (
            <div className ="Test">
                {this.grid}
            </div>
        );
    }
}

export default ShopPage;