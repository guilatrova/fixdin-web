import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import CompleteAccountsTable, { consts } from '../../accounts/components/CompleteAccountsTable';
import TransactionsDonutChart from '../../../charts/TransactionsDonutChart';
import { selectors } from '../duck';
import { selectors as accountSelectors } from '../../accounts/duck';
import PeriodPicker from '../../../balances/components/PeriodPicker';
import heightCalculator from '../../../utils/tableHeightCalculator';

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
        textAlign: 'center'
    },
    chartHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase'
    },
    periodInput: {
        width: 56,
        padding: 0,
        textTransform: 'uppercase'
    },
    accountsTable: {
        flex: 2,
        padding: '0 8px'
    }
};

const TransactionHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts, classes }) => {
    const { rowHeight, rowsUntilScroll } = consts;
    const chartHeight = heightCalculator.calculateHeight(aggregatedAccounts, rowHeight, rowsUntilScroll);

    return (
        <div className={classes.root}>

            <div className={classes.chart}>
                <div className={classes.chartHeader}>
                    <Typography variant="body2">BALANÇO</Typography>
                    <PeriodPicker classes={{ periodInput: classes.periodInput }} format="MMMM" />
                </div>

                <TransactionsDonutChart
                    period={period}
                    incomes={totalIncomes}
                    expenses={totalExpenses}
                    total={total}
                    height={chartHeight}
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
