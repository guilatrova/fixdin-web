import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import PaymentOrderStepper from './PaymentOrderStepper';
import { selectors as transactionsSelectors } from '../../transactions/transactions/duck';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
});

const PaymentOrderPage = ({classes}) => {
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>

                        <PaymentOrderStepper />
                        
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

PaymentOrderPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PaymentOrderPage);