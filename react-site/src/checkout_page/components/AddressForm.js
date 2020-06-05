import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class AddressForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            country: ""
        };
    }

    onChange(event) {
        const fieldName = event.currentTarget.name;
        let newState = {};
        switch (fieldName) {
            case "firstName":
                newState = {
                    firstName: event.target.value
                };
                break;
            case "lastName":
                newState = {
                    lastName: event.target.value
                };
                break;
            case "address1":
                newState = {
                    address1: event.target.value
                };
                break;
            case "address2":
                newState = {
                    address2: event.target.value
                };
                break;
            case "city":
                newState = {
                    city: event.target.value
                };
                break;
            case "state":
                newState = {
                    state: event.target.value
                };
                break;
            case "zip":
                newState = {
                    zip: event.target.value
                };
                break;
            case "country":
                newState = {
                    country: event.target.value
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            country: this.state.country,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <form id={this.props.formId} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                onChange={this.onChange.bind(this)}
                                value={this.state.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                onChange={this.onChange.bind(this)}
                                value={this.state.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                onChange={this.onChange.bind(this)}
                                value={this.state.address1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Address line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                onChange={this.onChange.bind(this)}
                                value={this.state.address2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                onChange={this.onChange.bind(this)}
                                value={this.state.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                onChange={this.onChange.bind(this)}
                                value={this.state.state}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                onChange={this.onChange.bind(this)}
                                value={this.state.zip}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                onChange={this.onChange.bind(this)}
                                value={this.state.country}
                            />
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}

export default AddressForm;