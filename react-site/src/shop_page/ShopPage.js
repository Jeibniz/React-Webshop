import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { currentItemAction } from 'actions/currentItemAction'
import ShopPageItem from './components/ShopPageItem'
import routes from "constants/routes";
import './ShopPage.css';
import placeholderData from 'placeholder_resources/itemData.json'


const mapDispatchToProps = dispatch => ({
    currentItemAction: (item) => dispatch(currentItemAction(item))
});

const mapStateToProps = state => ({
    ...state
});


/**
 * Contains the page where the user browses items to shop.
 */
class ShopPage extends Component {
    // TODO: Replace with data from API

    ITEMS_PER_ROW = 3;
    GRID_SPACING = 5;

    constructor(props) {
        super(props);
        this.state = {itemData: placeholderData.items};
        let items = this.createGridItems();
        this.grid = this.wrapTagsInGridContainer(items, this.GRID_SPACING, 'gridContainer_1');
    }

    createGridItems = () => {
      if(null === this.state.itemData){
          return null;
      }
      return this.state.itemData.map((element, id) => {
          return    <Grid item
                    xs = {12}
                    sm = {6}
                    md = {4}
                    key = {"shop_page_item_" + id}
                    data-testid= "item"
                    className = "ShopPage-GridItem"
                    onClick = {() => this.onItemClick(element)}
                    >
                        <ShopPageItem
                        key = {"shop_page_item_" + id}
                        className ="test"
                        item = {element}/>
                    </Grid>
      });
    };

    wrapTagsInGridContainer = (items, spacing, key) => {
        return <Grid
            container
            className ="ShopPage-GridContainer"
            key = {key} data-testid="container"
            spacing={spacing}> {items} </Grid>
    };

    onItemClick = (item) => {
        console.log("Clicked Item: " + item.name);
        this.addItemToRedux(item);
        this.routeToDetail();
    };

    /**
     * Will set the given item to current item in Redux.
     * @param item Item that will be set to given item.
     */
    addItemToRedux= (item) => {
        this.props.currentItemAction(item);
    };

    routeToDetail = () => {
        this.props.history.push(routes.DETAIL);
    };


    render() {
        return (
            <div className ="ShopPage-Container">
                {this.grid}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ShopPage));