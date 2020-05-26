import React from "react";
//import Grid from '@material-ui/core/Grid';
import { render, unmountComponentAtNode } from "react-dom";
import ShopPage from './ShopPage';

import TestRenderer from 'react-test-renderer';
import ShopPageItem from "./components/ShopPageItem";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


it("renders with ShopPageItem:s based on itemData state", () => {
    const testRenderer = TestRenderer.create(<ShopPage />);
    const shopPage = testRenderer.getInstance();

    const items = testRenderer.root.findAllByType(ShopPageItem);
    expect(items.length).toEqual(shopPage.state.itemData.length);

    for(let i = 0; i < items.length; i++){
        expect(items[i].props.itemName).toEqual(shopPage.state.itemData[i]);
    }
});

/*
TODO: Implement
it("renders with correct number of items per row", () => {

});
*/

