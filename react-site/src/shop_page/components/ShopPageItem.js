import React, { Component } from 'react';

/**
 * Shows information about one shopping item.
 */
class ShopPageItem extends Component {

    render() {
        return (
            <div className="App">
                <p>
                    {this.props.itemName}
                </p>
            </div>
        );
    }
}

export default ShopPageItem;