import React, { Component } from 'react';
import { withRouter } from 'react-router'
import routes from "constants/routes";
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    topBar: {
        height: '8vh',
        minHeight: '60px',
    },
    homeButton: {
        marginLeft: theme.spacing(5),
    },
    spaceFiller: {
        flexGrow: 1,
    },
    logoText: {
        alignText: "left",
        alignItems: "flex-start",
        cursor: "default",
    },
    cartButton: {
        marginRight: theme.spacing(5),
    },
});

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -4,
        top: 5,
    },
}))(Badge);

const mapStateToProps = state => ({
    ...state
});


/**
 * The apps toolbar
 */
class CartAppBar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            itemsInCart: 0,
        };

    }

    static getDerivedStateFromProps(nextProps, prevState){
        const itemsInCart = nextProps.cartReducer.itemsInCart;

        if( itemsInCart !== prevState.itemsInCart){
            return { itemsInCart: itemsInCart};
        }
        else {
            return null;
        }
    }

    routeToHome = () => {
        console.log("Routing to HOME");
        this.props.history.push(routes.HOME);
    };


    routeToCheckout = () => {
        this.props.history.push(routes.CART);
    };


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.topBar}>
                    <Toolbar>
                        <IconButton
                            edge="start" color="inherit"
                            className={classes.homeButton}
                            onClick = {this.routeToHome}>
                            <HomeIcon style={{ fontSize: 30 }} />
                        </IconButton>
                        <Typography
                            className={classes.logoText}
                            onClick = {this.routeToHome}
                            variant = "h6">
                            <Box fontWeight="fontWeightBold" m={1}>
                                Jonathans Demo shop
                            </Box>
                        </Typography>

                        <Typography className={classes.spaceFiller} />

                        <IconButton
                            edge="end" color="inherit" aria-label="cart"
                            className = {classes.cartButton}
                            onClick = {this.routeToCheckout}>
                            <StyledBadge
                                badgeContent={this.state.itemsInCart}
                                color="secondary">
                                <ShoppingCartIcon style={{ fontSize: 30 }}/>
                            </StyledBadge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

CartAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps) (withRouter(withStyles(styles)(CartAppBar)));
