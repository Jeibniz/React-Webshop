import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ShopPageItem from './ShopPageItem';

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

it("renders with an item name.", () => {
    act(() => {
        render(<ShopPageItem itemName={"Test1"}  />, container);
    });
    expect(container.textContent).toBe("Test1");

    act(() => {
        render(<ShopPageItem itemName={"Test4"}  />, container);
    });
    expect(container.textContent).toBe("Test4");

    act(() => {
        render(<ShopPageItem />, container);
    });
    expect(container.textContent).toBe("");
});