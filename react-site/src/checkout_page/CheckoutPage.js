import React, { Component } from 'react';
/*import { connect } from 'react-redux';*/
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button';
/*
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

import imagePath from "constants/placeholderImages"
import routes from "constants/routes";
*/

/*
const mapStateToProps = state => ({
    ...state
});
*/


/**
 * The page where the user confirms the purchase and adds address details.
 */
class CheckoutPage extends Component {

    constructor(props) {
        super(props);
        this.cartMap = new Map();
        this.cartMap.set(1, 4);
        this.cartMap.set(2, 3);
        this.cartMap.set(1, 5);

    }

    onButtonClick = () => {
        console.log(JSON.stringify(this.cartMap));
        console.log(this.cartMap);
    };

    render() {
       return (
           <div>
               <h3>Checkout</h3>
               <Button type = "submit"
                       variant = "contained"
                       color = "primary"
                       buttonstyle = {{ borderRadius: 50 }}
                       style={{borderRadius:50}}
                       onClick = {this.onButtonClick}
               >
                   Hello
               </Button>
           </div>
       );
    }
}

export default withRouter(CheckoutPage);