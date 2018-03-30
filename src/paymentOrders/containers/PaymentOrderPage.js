import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import TransactionsOverTimeWrapper from './TransactionsOverTimeWrapper';
import PendingBalanceTable from '../components/PendingBalanceTable';
import AccountsBalanceTable from '../components/AccountsBalanceTable';
import { operations as balanceOperations } from '../../balances/duck';
import { operations as transactionOperations } from '../../transactions/transactions/duck';
import { operations as accountOperations } from '../../transactions/accounts/duck';
import { operations } from '../duck';

const styles = () => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        overflowX: 'scroll'
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    pendingBalanceTable: {
        flex: 1
    },
    accountsBalanceTable: {
        flex: 2
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

                <div className={classes.header}>
                    <div className={classes.pendingBalanceTable}>
                        <PendingBalanceTable />
                    </div>

                    <div className={classes.accountsBalanceTable}>
                        <AccountsBalanceTable />
                    </div>
                </div>

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
    onStart: () => {
        dispatch(operations.reset());
        
        dispatch(balanceOperations.fetchPendingExpensesBalance());
        dispatch(balanceOperations.fetchPendingIncomesBalance());
        dispatch(balanceOperations.fetchDetailedAccountsBalance());
        dispatch(accountOperations.fetchAccounts());

        dispatch(transactionOperations.fetchOldestExpense()).then(() => {
            const p1 = dispatch(balanceOperations.fetchRealBalance());
            const p2 = dispatch(operations.fetchNextExpenses());
            Promise.all([p1, p2]).then(() => {
                dispatch(operations.checkDefaultExpenses());
            });
        });
    }
});

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PaymentOrderPage)
);