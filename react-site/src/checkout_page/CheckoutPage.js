import React from 'react';
import { useDispatch } from 'react-redux'
import { emptyCartAction } from 'actions/emptyCartAction'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddressForm from "checkout_page/components/AddressForm"
import PaymentForm from 'checkout_page/components/PaymentForm';
import Review from 'checkout_page/components/Review';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [addressData, setAddressData] = React.useState({});
    const [paymentData, setPaymentData] = React.useState({});
    const formId = "checkoutForm";

    const dispatch = useDispatch();

    const handleNext = () => {
        // Get a reference to current from.
        const form = document.getElementById(formId);
        // Stay if form is not valid yet
        if(null !== form && !form.reportValidity()){
            return;
        }

        // Clear cart if switching to the last step.
        if(activeStep + 1 === steps.length){
            dispatch(emptyCartAction());
        }

        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onAddressUpdate = (data) => {
        setAddressData(data);
    };

    const onPaymentUpdate = (data) => {
        setPaymentData(data);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm callback={onAddressUpdate} formId = {formId} />;
            case 1:
                return <PaymentForm callback={onPaymentUpdate} formId = {formId} />;
            case 2:
                return <Review address = {addressData} payment = {paymentData}/>;
            default:
                throw new Error('Unknown step');
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #2001539. We have emailed your order confirmation, and will
                                    send you an update when your order has shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}