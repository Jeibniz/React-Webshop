import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { addItemToCartAction } from 'actions/addItemToCartAction'
import { subtractItemFromCartAction } from 'actions/subtractItemFromCartAction'
import { removeItemFromCartAction } from 'actions/removeItemFromCartAction'
import ItemLoader from 'network/itemLoader'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { green, red } from '@material-ui/core/colors';

import routes from "constants/routes";
import imagePath from "constants/placeholderImages"

const mapDispatchToProps = dispatch => ({
    addItemToCartAction: (cart, item) => dispatch(addItemToCartAction(cart, item)),
    subtractItemFromCartAction: (cart, item) => dispatch(subtractItemFromCartAction(cart, item)),
    removeItemFromCartAction: (cart, item) => dispatch(removeItemFromCartAction(cart, item))
});


const mapStateToProps = state => ({
    ...state
});

const styles = (theme) => ({
    paper: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    table: {
        minWidth: 650,
    },

    addFab: {
        color: green[500]
    },

    removeFab: {
        color: red[500]
    },

    removeButton: {
        fontSize: 11,
    },

    itemTextContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "left",
    },

    itemContainer: {
        display: "flex"
    },

    itemImage: {
        width: "15vw",
        height: "auto",
    },
    header: {
        fontWeight: 700,
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },

    checkoutButton: {
        fontSize: "larger",
        marginTop: theme.spacing(2),
        borderRadius:50
    }
});

/**
 * The page where the user confirms the purchase and adds address details.
 */
class CartPage extends Component {

    constructor(props) {
        super(props);
        this.cartMap = new Map();
        this.cartMap.set(1, 4);
        this.cartMap.set(2, 3);
        this.cartMap.set(1, 5);

        this.state = {
            items: ItemLoader.loadItem(this.props.cartReducer.cart)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return { "items" : ItemLoader.loadItems(nextProps.cartReducer.cart) };
    }

    /**
     * Will route to checkout page
     */
    onCheckoutButtonClick() {
        this.props.history.push(routes.CHECKOUT);
    }

    // Creates a redux action for adding an item
    addItem = (itemId) => {
        let cart = this.getValidCart();
        this.props.addItemToCartAction(cart, itemId);
    };

    // Creates a redux action for subtracting an item
    subtractItem = (itemId) => {
        let cart = this.getValidCart();
        this.props.subtractItemFromCartAction(cart, itemId);
    };

    // Creates a redux action for removing an item
    removeItem = (itemId) => {
        let cart = this.getValidCart();
        this.props.removeItemFromCartAction(cart, itemId);
    };

    /**
     * @returns {Map} Ether the cart given in props of a new map if that one is null.
     */
    getValidCart() {
        return this.props.cartReducer.cart instanceof Map ? this.props.cartReducer.cart : new Map();
    };

    /**
     * The total cost of the quantity of the given item
     * @return item.price * item.quantity, if one is not defined, 0 is returned.
     */
    totalItemPrice(item) {
        if(undefined === item.price || undefined === item.quantity){
            return 0;
        }
        return item.price * item.quantity;
    };

    /**
     * Calculates the total cost of the order.
     */
    totalPrice() {
        let sum = 0;

        for(let i = 0; i < this.state.items.length; i++){
            sum += this.totalItemPrice(this.state.items[i]);
        }
        return sum;
    }

    renderTableHeader(classes) {
        return(
            <TableHead>
                <TableRow>
                    <TableCell className={classes.header} >
                        <Typography>
                            Product
                        </Typography>
                    </TableCell>
                    <TableCell className={classes.header} align="left">
                        <Typography>
                            Quantity
                        </Typography>

                    </TableCell>
                    <TableCell className={classes.header}align="left">
                        <Typography>
                            Total
                        </Typography>
                    </TableCell>
                    <TableCell className={classes.header} align="left">
                        <Typography>
                            Remove
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    };

    renderTableBody(classes) {
        return (
            <TableBody>
                {this.state.items.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell component="th" scope="row" className={classes.itemContainer}>
                            <img src={imagePath(item.image_name)} alt="Product"
                                 className = {classes.itemImage} />
                            <div className = {classes.itemTextContainer}>
                                <Typography component="h1">
                                    <Box fontWeight="fontWeightBold" m={1}>
                                        {item.brand}
                                    </Box>
                                </Typography>
                                <Typography component="h1">
                                    <Box fontWeight="fontWeightRegular" m={1}>
                                        {item.name}
                                    </Box>
                                </Typography>
                            </div>
                        </TableCell>
                        <TableCell align="left">
                            <IconButton
                                onClick = {() => this.subtractItem(item.id)}>
                                <Icon
                                    style={{ color: red[500] }}>
                                    remove_circle</Icon>
                            </IconButton>
                            {item.quantity}
                            <IconButton
                                onClick = {() => this.addItem(item.id)}>
                                <Icon
                                    style={{ color: green[500] }}>
                                    add_circle
                                </Icon>
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            <Typography>
                                {this.totalItemPrice(item)} {item.price_unit}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Button
                                variant = "contained"
                                startIcon={<DeleteIcon  />}
                                onClick = {() => this.removeItem(item.id)}>
                                <Typography variant="button" className={classes.removeButton} >
                                    Remove
                                </Typography>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    renderTableFooter(classes) {
        return(
            <TableFooter>
                <TableRow>
                    <TableCell/>
                    <TableCell align="left"/>
                    <TableCell className={classes.total} align="left">
                        <Typography component="h1" variant="body1">
                            <Box fontWeight="fontWeightBold" m={1}>
                                Total:
                            </Box>
                        </Typography>
                    </TableCell>
                    <TableCell align="left">

                    <Typography component="h1" variant="body1">
                        <Box fontWeight="fontWeightBold" m={1}>
                            {this.totalPrice()} {"kr"}
                        </Box>
                    </Typography>

                    </TableCell>
                </TableRow>
            </TableFooter>
        );
    }



    render() {
        const { classes } = this.props;

        return (
           <Paper className={classes.paper}>
               <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
               <Typography variant="h6" gutterBottom>
                   Order summary
               </Typography>

               <TableContainer style = {{marginBottom: "0px"}} >
                   <Table className={classes.table} aria-label="simple table">
                       {this.renderTableHeader(classes)}
                       {this.renderTableBody(classes)}
                       {this.renderTableFooter(classes)}
                   </Table>
               </TableContainer>

               <Button
                   className = "classes.checkoutButton"
                   variant = "contained"
                   color = "primary"
                   onClick = {this.onCheckoutButtonClick.bind(this)}

                   buttonstyle = {{ borderRadius: 50 }}
                   style={{
                       borderRadius:50,
                       margin: "10vh 0 5vh 0"
                   }}
               >
                   <Typography component="h2" variant="body1">
                       <Box fontWeight="fontWeightRegular" m={1}>
                           Checkout
                       </Box>
                   </Typography>
               </Button>

           </Paper>
       );
    }
}

CartPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(withStyles(styles)(CartPage)));