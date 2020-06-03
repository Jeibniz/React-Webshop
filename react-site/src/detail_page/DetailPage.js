import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { addItemToCartAction } from 'actions/addItemToCartAction'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import CartUpdateSnackBar from "components/CartUpdateSnackBar"
import imagePath from "constants/placeholderImages"
import routes from "constants/routes";
import "./DetailPage.css"

const mapDispatchToProps = dispatch => ({
    addItemToCartAction: (cart, item) => dispatch(addItemToCartAction(cart, item))
});

const mapStateToProps = state => ({
    ...state
});

/**
 * Contains the page where a specific item is displayed and added to the cart.
 */
class DetailPage extends Component {

    constructor(props) {
        super(props);
        let item;
        if(undefined === this.props.currentItemReducer.current_item){
            console.log("DetailPage: undefined item, routing back to HOME");
            item = null;
            this.routeBack();
        } else {
            item = this.props.currentItemReducer.current_item;
        }

        this.state = {
            item: item,
            snackbarOpen: false
        };
    }

    routeBack = () => {
        this.props.history.push(routes.HOME);
    };

    onAddToCartClick = () => {
        let cart = this.props.cartReducer.cart instanceof Map ? this.props.cartReducer.cart : new Map();
        let itemId = this.state.item.id;
        this.props.addItemToCartAction(cart, itemId);

        this.showSnackBar();
    };

    showSnackBar = ()  => {
        this.setState({
            snackbarOpen: true
        });
    };

    onCloseSnackBar(event, reason) {
        if("clickaway" === reason){
            return;
        }
        this.setState({
            snackbarOpen: false
        });
    }

    render() {
        if(null === this.state.item){
            console.log("Detail page: item is null");
            return (
                <div className ="DetailPage-Container">
                    <h1> {"Routing back, item is undefined"} </h1>
                </div>
            );
        }

        const productImage = imagePath(this.state.item.image_name);

        return (
            <div className="DetailPage-Container">
                <Grid container component={Paper} className="DetailPage-Grid">
                    <CssBaseline />

                    <Grid item
                          xs={10} sm={7}
                          className="DetailPage-ImageContainer">
                        <img className="DetailPageItem-Image" src={productImage} alt="Product" />
                    </Grid>
                    <Grid item
                          xs={10} sm={4}
                          className="DetailPage-TextContainer"
                          >

                        <Typography component="h2" variant="h5">
                            <Box fontWeight="fontWeightBold" m={1}>
                                {this.state.item.brand}
                            </Box>
                        </Typography>
                        <Typography component="h1" variant="h4">
                            <Box fontWeight="fontWeightRegular" m={1}>
                                {this.state.item.name}
                            </Box>
                        </Typography>
                        <Typography component="h6" variant="body1">
                            <Box fontWeight="fontWeightLight" m={1}>
                                {this.state.item.description}
                            </Box>
                        </Typography>
                        <Typography component="h1" variant="h4">
                            <Box fontWeight="fontWeightBold" m={1}>
                                {this.state.item.price} {this.state.item.price_unit}
                            </Box>
                        </Typography>
                        <Typography component="h1" variant="body1">
                            <Box fontWeight="fontWeightLight" m={1}>
                                {this.state.item.stock} in stock
                            </Box>
                        </Typography>
                        <Button
                            className = "DetailPageItem-AddToCartButton"
                            type = "submit"
                            fullWidth
                            variant = "contained"
                            color = "primary"
                            onClick = {this.onAddToCartClick}

                            buttonstyle = {{ borderRadius: 50 }}
                            style={{borderRadius:50}}

                            startIcon={<AddShoppingCartOutlinedIcon  style={{ fontSize: 30 }} />}>

                            <Typography component="h2" variant="body1">
                                <Box fontWeight="fontWeightRegular" m={1}>
                                    Add to cart
                                </Box>
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <CartUpdateSnackBar
                    open={this.state.snackbarOpen}
                    autoHideDuration={4000}
                    onClose={(event, reason) => {this.onCloseSnackBar(event, reason)}}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(DetailPage));