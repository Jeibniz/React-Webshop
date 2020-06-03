import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(5),
        },
    },
}));

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

    /*
                    TransitionComponent={state.Transition}

                    key={state.Transition.name}
 */

    render() {
        const { classes } = this.props;
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

CartUpdateSnackBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartUpdateSnackBar);
