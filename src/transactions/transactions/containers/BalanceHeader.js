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
    chartWrapper: {
        height: 220,
        maxHeight: 220
    },
    balancesTable: {
        flex: 1
    },
    accountsTable: {
        flex: 2,
        padding: '0 8px'
    }
};

const BalanceHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts, classes }) => {
    return (
        <div className={classes.root}>
            <div className={classes.balancesTable}>
                <div className={classes.chartWrapper}>
                    <TransactionsDonutChart
                        period={period}
                        incomes={totalIncomes}
                        expenses={totalExpenses}
                        total={total}
                        height={200}
                        width={200}
                    />
                </div>
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

BalanceHeader.propTypes = {
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
    connect(mapStateToProps)(BalanceHeader)
);
