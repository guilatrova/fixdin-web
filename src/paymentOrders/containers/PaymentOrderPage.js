import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import TransactionsOverTimeWrapper from './TransactionsOverTimeWrapper';
import PaymentOrderHeader from './PaymentOrderHeader';
import balanceOptions from '../../balances/options';
import { operations as balanceOperations } from '../../balances/duck';
import { operations as accountOperations } from '../../transactions/accounts/duck';
import { operations } from '../duck';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 6,
    }
});

class PaymentOrderPage extends React.Component {

    componentDidMount() {
        this.props.onStart();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <PaymentOrderHeader />

                <Paper className={classes.paper}>
                    <TransactionsOverTimeWrapper />
                </Paper>

                {/* <div className={classes.surrounding}>
                    <div className={classes.smallerTable}>
                        <YearBalanceTable />
                    </div>

                    <div className={classes.biggerTable}>
                        <PeriodicsDetailedTable />
                    </div>
                </div> */}
            </div>
        );
    }
}

PaymentOrderPage.propTypes = {
    onStart: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onStart: () => {
        dispatch(operations.reset());

        dispatch(balanceOperations.fetchDetailedBalance(balanceOptions().pending().build()));
        dispatch(balanceOperations.fetchDetailedAccountsBalance());
        dispatch(accountOperations.fetchAccounts());

        dispatch(operations.initializeData());
    }
});

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PaymentOrderPage)
);