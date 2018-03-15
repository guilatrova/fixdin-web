import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import Step2 from './Step2';
import { operations as balanceOperations } from '../../balances/duck';
import { selectors, operations } from '../duck';

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

class PaymentOrderPage extends React.Component {

    componentDidMount() {
        this.props.onStart();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Step2 />
                </Paper>
            </div>
        );
    }
}

PaymentOrderPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onStart: (fromDate, untilDate) => {
        dispatch(operations.resetStep2());
        dispatch(balanceOperations.fetchRealBalance());
        dispatch(operations.fetchNextExpenses(fromDate, untilDate)).then(() => {
            dispatch(operations.checkDefaultExpenses());
        });
    }
});

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PaymentOrderPage)
);