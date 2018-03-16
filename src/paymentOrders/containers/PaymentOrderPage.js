import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import TransactionsOverTimeWrapper from './TransactionsOverTimeWrapper';
import { operations as balanceOperations } from '../../balances/duck';
import { operations } from '../duck';

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
                    <TransactionsOverTimeWrapper />
                </Paper>
            </div>
        );
    }
}

PaymentOrderPage.propTypes = {
    onStart: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onStart: (fromDate, untilDate) => {
        dispatch(operations.reset());
        
        const p1 = dispatch(balanceOperations.fetchRealBalance());
        const p2 = dispatch(operations.fetchNextExpenses(fromDate, untilDate));
        
        Promise.all([p1, p2]).then(() => {
            dispatch(operations.checkDefaultExpenses());
        });
    }
});

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PaymentOrderPage)
);