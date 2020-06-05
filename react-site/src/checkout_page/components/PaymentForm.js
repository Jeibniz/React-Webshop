import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


class PaymentForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            date: "",
            cvv: ""
        };
    }

    onChange(event) {
        const fieldName = event.currentTarget.name;
        let newState = {};
        switch (fieldName) {
            case "name":
                newState = {
                    name: event.target.value
                };
                break;
            case "number":
                newState = {
                    number: event.target.value
                };
                break;
            case "date":
                newState = {
                    date: event.target.value
                };
                break;
            case "cvv":
                newState = {
                    cvv: event.target.value
                };
                break;
            default:
                break;
        }
        this.setState(newState);

        this.props.callback(this.getFromDataFromState());
    }

    /**
     * Returns the data from the from as an object.
     */
    getFromDataFromState() {
        return {
            name: this.state.name,
            number: this.state.number,
            date: this.state.date,
            cvv: this.state.cvv
        };
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Payment method
                </Typography>

                <form id={this.props.formId} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardName"
                                label="Name on card"
                                fullWidth
                                autoComplete="cc-name"
                                name="name"
                                onChange={this.onChange.bind(this)}
                                value={this.state.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                name="number"
                                onChange={this.onChange.bind(this)}
                                value={this.state.number}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="expDate"
                                label="Expiry date"
                                fullWidth
                                autoComplete="cc-exp"
                                name="date"
                                onChange={this.onChange.bind(this)}
                                value={this.state.date}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                name="cvv"
                                onChange={this.onChange.bind(this)}
                                value={this.state.cvv}
                            />
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}

export default PaymentForm;