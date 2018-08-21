import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PeriodicsDetailedTable from '../../balances/components/PeriodicsDetailedTable';
import { selectors as balanceSelectors } from '../../balances/duck';
import { selectors as accountSelectors } from '../../transactions/accounts/duck';

const styles = () => ({
    root: {
    },
    balancesTable: {
        width: "19%",
        display: "inline-block"
    },
    accountsTable: {
        width: "81%",
        display: "inline-block"
    }
});

const PaymentOrderFooter = ({ classes }) => {
    return (
        <div className={classes.root}>

            <div className={classes.balancesTable}>
                <p>Chart</p>
            </div>

            <div className={classes.accountsTable}>
                <PeriodicsDetailedTable />
            </div>

        </div>
    );
};

PaymentOrderFooter.propTypes = {
    accountsNames: PropTypes.array.isRequired,
    accountsBalances: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    accountsNames: accountSelectors.getAccountsNamesMappedById(state),
    accountsBalances: balanceSelectors.getDetailedAccounts(state)
});

export default withStyles(styles)(
    connect(mapStateToProps)(PaymentOrderFooter)
);
