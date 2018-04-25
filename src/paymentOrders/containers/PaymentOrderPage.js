import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import TransactionsOverTimeWrapper from './TransactionsOverTimeWrapper';
import PendingBalanceTable from '../components/PendingBalanceTable';
import YearBalanceTable from '../components/YearBalanceTable';
import AccountsBalanceTable from '../../transactions/accounts/components/AccountsBalanceTable';
import BalanceOverTimeTable from '../components/BalanceOverTimeTable';
import { operations as balanceOperations } from '../../balances/duck';
import balanceOptions from '../../balances/options';
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
    surrounding: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    smallerTable: {
        flexShrink: 1
    },
    biggerTable: {
        flex: 4
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

                <div className={classes.surrounding}>
                    <div className={classes.smallerTable}>
                        <PendingBalanceTable />
                    </div>

                    <div className={classes.biggerTable}>
                        <AccountsBalanceTable />
                    </div>
                </div>

                <Paper className={classes.paper}>
                    <TransactionsOverTimeWrapper />
                </Paper>

                <div className={classes.surrounding}>
                    <div className={classes.smallerTable}>
                        <YearBalanceTable />
                    </div>

                    <div className={classes.biggerTable}>
                        <BalanceOverTimeTable />
                    </div>
                </div>
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
        
        dispatch(operations.fetchStartPeriodAlongData());        
    }
});

export default withStyles(styles)(
    connect(null, mapDispatchToProps)(PaymentOrderPage)
);