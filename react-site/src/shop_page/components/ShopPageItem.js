import React, { Component } from 'react';
import imagePath from "constants/PlaceholderImages"
import './ShopPageItem.css';

/**
 * Shows information about one shopping item.
 */
class ShopPageItem extends Component {

    render() {
        const productImage = imagePath(this.props.item.image_name);
        return (
            <div className="ShopPageItem-Container">

                <img className="ShopPageItem-Image" src={productImage} alt="Product" />

                <p className="ShopPageItem-Brand">
                    {this.props.item.brand}
                </p>

                <p className="ShopPageItem-Name">
                    {this.props.item.name}
                </p>

                <p className="ShopPageItem-Price">
                    {this.props.item.price}  {this.props.item.price_unit}
                </p>
            </div>
        );
    }
}

export default ShopPageItem;