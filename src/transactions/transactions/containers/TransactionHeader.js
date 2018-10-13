import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CompleteAccountsTable from '../../accounts/components/CompleteAccountsTable';
import TransactionsDonutChart from '../../../charts/TransactionsDonutChart';
import { selectors } from '../duck';
import { selectors as accountSelectors } from '../../accounts/duck';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'stretch',
    },
    chart: {
        flex: 1,
    },
    accountsTable: {
        flex: 2,
        padding: '0 8px'
    }
};

const TransactionHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts, classes }) => {
    const rowHeight = 40;
    const rowsUntilScroll = 5;
    const additionalHeight = (rowHeight * 2); // footer/header
    const maxHeight = (rowHeight * rowsUntilScroll) + (rowHeight / 2) + additionalHeight; // Leave a half row
    let actualHeight = (aggregatedAccounts.length * rowHeight) + additionalHeight;
    if (actualHeight > maxHeight) {
        actualHeight = maxHeight;
    }

    return (
        <div className={classes.root}>
            <div className={classes.chart}>
                <TransactionsDonutChart
                    period={period}
                    incomes={totalIncomes}
                    expenses={totalExpenses}
                    total={total}
                    height={actualHeight}
                />
            </div>

            <div className={classes.accountsTable}>
                <CompleteAccountsTable
                    names={accountsName}
                    values={aggregatedAccounts}
                />
            </div>
        </div>
    );
};

TransactionHeader.propTypes = {
    total: PropTypes.number.isRequired,
    totalIncomes: PropTypes.number.isRequired,
    totalExpenses: PropTypes.number.isRequired,
    period: PropTypes.object.isRequired,
    accountsName: PropTypes.array.isRequired,
    aggregatedAccounts: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        total: selectors.getTotalValueOfDisplayedTransactions(state),
        totalExpenses: selectors.getTotalValueOfDisplayedExpenses(state),
        totalIncomes: selectors.getTotalValueOfDisplayedIncomes(state),
        period: selectors.getDisplayedPeriod(state),

        accountsName: accountSelectors.getAccountsNamesMappedById(state),
        aggregatedAccounts: selectors.getTotalValueOfDisplayedTransactionsGroupedByAccount(state),
    };
};

export default withStyles(styles)(
    connect(mapStateToProps)(TransactionHeader)
);
