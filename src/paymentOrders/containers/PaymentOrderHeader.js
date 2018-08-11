import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PendingBalanceTable from '../components/PendingBalanceTable';
import SimpleAccountsTable from '../../transactions/accounts/components/SimpleAccountsTable';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors as accountSelectors } from '../../transactions/accounts/duck';

const styles = () => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch'
    },
    balancesTable: {
        flex: 1
    },
    accountsTable: {
        flex: 2,
        padding: '0 8px'
    }
});

const PaymentOrderHeader = ({ accountsNames, accountsBalances, classes }) => {
    return (
        <div className={classes.root}>

            <div className={classes.balancesTable}>
                <PendingBalanceTable />
            </div>

            <div className={classes.accountsTable}>
                <SimpleAccountsTable
                    names={accountsNames}
                    values={accountsBalances}
                />
            </div>

        </div>
    );
};

PaymentOrderHeader.propTypes = {
    accountsNames: PropTypes.array.isRequired,
    accountsBalances: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    accountsNames: accountSelectors.getAccountsNamesMappedById(state),
    accountsBalances: balanceSelectors.getDetailedAccounts(state)
});

export default withStyles(styles)(
    connect(mapStateToProps)(PaymentOrderHeader)
);