import React, { Component } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * A snack-bar showing a cart update.
 */
class CartUpdateSnackBar extends Component {

    static defaultProps = {
        autoHideDuration: 3000
    };

    constructor (props) {
        super(props);
        this.state = {
            open: props.open,
        };

    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.open !== prevState.open) {
            return {
                open: nextProps.open
            };
        }
        return null;
    }

    render() {
        return (
            <Snackbar
                open = {this.state.open}
                autoHideDuration = {this.props.autoHideDuration}
                onClose = {this.props.onClose}
                message = "I love snacks"
            >
                <Alert onClose={this.props.onClose} severity="success">
                    Item successfully added to cart
                </Alert>
            </Snackbar>
        );
    }
}

export default CartUpdateSnackBar;
