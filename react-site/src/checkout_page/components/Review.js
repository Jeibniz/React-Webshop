import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ItemLoader from 'network/itemLoader'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
});

const mapStateToProps = state => ({
    ...state
});

class Review extends Component {

    addresses =
        [this.props.address.address1, this.props.address.address2, this.props.address.city,
                this.props.address.state, this.props.address.zip, this.props.address.country];
    payments = [
        { name: 'Card holder', detail: this.props.payment.name },
        { name: 'Card number', detail: this.props.payment.number },
        { name: 'Expiry date', detail: this.props.payment.date },
    ];

    constructor(props) {
        super(props);

        this.state = {
            items: ItemLoader.loadItems(this.props.cartReducer.cart)
        };

        // Remove unused address fields
        this.addresses = this.addresses.filter( (data) => {
            return data !== "";
        });
    }

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

    render() {
        const classes = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <List disablePadding>
                    {this.state.items.map((item) => (
                        <ListItem className={classes.listItem} key={item.name}>
                            <ListItemText primary={item.quantity + " x " + item.name} />
                            <Typography variant="body2">{item.price * item.quantity} kr</Typography>
                        </ListItem>
                    ))}
                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" className={classes.total}>
                            {this.totalPrice()} kr
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            Shipping
                        </Typography>
                        <Typography gutterBottom>{this.props.address.firstName} {this.props.address.lastName}</Typography>
                        <Typography gutterBottom>{this.addresses.join(', ')}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            Payment details
                        </Typography>
                        <Grid container>
                            {this.payments.map((payment) => (
                                <React.Fragment key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps) (withStyles(styles)(Review));