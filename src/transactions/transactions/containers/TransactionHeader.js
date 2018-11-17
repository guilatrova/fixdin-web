import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import CompleteAccountsTable, { consts } from '../../accounts/components/CompleteAccountsTable';
import TransactionsDonutChart from '../../../charts/TransactionsDonutChart';
import { selectors, operations } from '../duck';
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
        width: 66,
        padding: 0,
        textTransform: 'uppercase'
    },
    accountsTable: {
        flex: 2,
        padding: '0 8px'
    }
};

const TransactionHeader = ({ period, totalIncomes, totalExpenses, total, accountsName, aggregatedAccounts, onChangePeriod, drilldownData, classes }) => {

    const { rowHeight, rowsUntilScroll } = consts;
    const chartHeight = heightCalculator.calculateHeight(aggregatedAccounts, rowHeight, rowsUntilScroll);
    const periodFormat = period.year() == moment().year() ? "MMMM" : "MMM/YY";

    return (
        <div className={classes.root}>

            <div className={classes.chart}>
                <div className={classes.chartHeader}>
                    <Typography variant="body2">BALANÇO</Typography>
                    <PeriodPicker classes={{ periodInput: classes.periodInput }} period={period} onChangePeriod={onChangePeriod} format={periodFormat} />
                </div>

                <TransactionsDonutChart
                    period={period}
                    incomes={totalIncomes}
                    expenses={totalExpenses}
                    total={total}
                    drilldown={drilldownData}
                    height={chartHeight}
                />
            </div>

            <div className={classes.accountsTable}>
                <Hidden xsDown>
                    <CompleteAccountsTable
                        names={accountsName}
                        values={aggregatedAccounts}
                    />
                </Hidden>
            </div>
        </div>
    );
};

TransactionHeader.propTypes = {
    total: PropTypes.number.isRequired,
    totalIncomes: PropTypes.number.isRequired,
    totalExpenses: PropTypes.number.isRequired,
    drilldownData: TransactionsDonutChart.propTypes.drilldown,
    period: PropTypes.object.isRequired,
    accountsName: PropTypes.array.isRequired,
    aggregatedAccounts: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,

    onChangePeriod: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    total: selectors.getTotalValueOfDisplayedTransactions(state),
    totalExpenses: selectors.getTotalValueOfDisplayedExpenses(state),
    totalIncomes: selectors.getTotalValueOfDisplayedIncomes(state),
    period: selectors.getDisplayedPeriod(state),
    drilldownData: selectors.getDonutChartDrilldown(state),

    accountsName: accountSelectors.getAccountsNamesMappedById(state),
    aggregatedAccounts: selectors.getTotalValueOfDisplayedTransactionsGroupedByAccount(state),
});

const mapDispatchToProps = (dispatch) => ({
    onChangePeriod: (period) => {
        const due_date_from = moment(period).startOf('month');
        const due_date_until = moment(due_date_from).endOf('month');

        dispatch(operations.setFilters({ due_date_from, due_date_until }, true));
        dispatch(operations.filterTransactions());
    }
});

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(TransactionHeader)
);
