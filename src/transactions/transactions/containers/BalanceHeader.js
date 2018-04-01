import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import BalanceSimpleTable from '../../../balances/components/BalanceSimpleTable';
import AggregatedAccountPeriodTable from '../components/AggregatedAccountPeriodTable';
import LastMonthsChart from '../components/LastMonthsChart';
import { selectors } from '../duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import { selectors as reportSelectors } from '../../../reports/duck';

const styles = {
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
    },
    chart: {
        flex: '2 1',
        maxHeight: '200px'
    }
};

const BalanceHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts, lastMonthsData, classes }) => {
    return (
        <div className={classes.root}>
            <div className={classes.balancesTable}>
                <BalanceSimpleTable
                    period={period}
                    incomes={totalIncomes}
                    expenses={totalExpenses}
                    total={total}
                />
            </div>

            <div className={classes.accountsTable}>
                <AggregatedAccountPeriodTable 
                    names={accountsName}
                    values={aggregatedAccounts}
                />
            </div>

            <div className={classes.chart}>
                <LastMonthsChart data={lastMonthsData} />
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
    lastMonthsData: PropTypes.object.isRequired,
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
        
        lastMonthsData: reportSelectors.getLastMonthsChart(state)
    };
};

export default withStyles(styles)(
    connect(mapStateToProps)(BalanceHeader)
);